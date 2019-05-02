import { Injectable, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge, Subscription } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

// Services
import { FirestoreService } from '../../../core/services/firestore.service';

// Models
import { Profile } from '../../../core/models/profile';
import { Address } from '../../../core/models/address';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public isLoading = false, 
    public profile?: Profile,
    public address?: Address
  ) { }
}
  
  @Injectable()
  export class DynamicDataSource {
    dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
    profileTree = {};
    subscriptions: Subscription[] = [];
    get data(): DynamicFlatNode[] {
      return this.dataChange.value;
    }
    set data(value: DynamicFlatNode[]) {
      this.treeControl.dataNodes = value;
      this.dataChange.next(value);
    }
    
    constructor(
      private treeControl: FlatTreeControl<DynamicFlatNode>,
      private route: ActivatedRoute,
      private fs: FirestoreService,
      private router: Router
    ) { 
      this.subscriptions.push(
        this.route.queryParams.subscribe(params => {
          console.log(params);
        })
      );
      this.subscriptions.push(
        this.route.paramMap.subscribe(paramMap => {
          const profileId = paramMap.get('profileId');
          this.fs.getProfileAddresses(profileId).subscribe(addresses => {
            const nodes: DynamicFlatNode[] = [];
            addresses.sort((a, b) => (a.sort < b.sort ? -1 : 1));
            addresses.forEach(address => 
              nodes.push(
                new DynamicFlatNode(
                  address.type,
                  0,
                  true,
                  false,
                  { id: profileId },
                  address
                )
              )
            );
            this.data = nodes;
          });
        })
      );
    }

    connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
      this.treeControl.expansionModel.onChange.subscribe(change => {
        if (
          (change as SelectionChange<DynamicFlatNode>).added ||
          (change as SelectionChange<DynamicFlatNode>).removed
        ) {
          this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
        }
      });

      return merge(collectionViewer.viewChange, this.dataChange).pipe(
        map(() => this.data)
      );
    }

    handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
      if (change.added) {
        change.added.forEach(node => this.toggleNode(node, true));
      }
      if (change.removed) {
        change.removed 
          .slice()
          .reverse()
          .forEach(node => this.toggleNode(node, false));
      }
    }

    toggleNode(node: DynamicFlatNode, expand: boolean) {
      const index = this.data.indexOf(node);
      node.isLoading = true;
      if (expand) {
        this.subscriptions.push(
          this.fs
            .getProfileAddresses(node.profile.id)
            .subscribe(async addresses => {
              console.log(addresses);
              const nodes: DynamicFlatNode[] = [];
              addresses.sort((a, b) => (a.sort < b.sort ? -1 : 1));
              addresses.forEach(address => 
                nodes.push(
                  new DynamicFlatNode(
                    address.type,
                    1,
                    false,
                    false,
                    node.profile,
                    address
                  )
                )
              );
              this.data.splice(index + 1, 0, ...nodes);
              this.dataChange.next(this.data);

              await this.router.navigate([], {
                relativeTo: this.route,
                queryParams: { addressId: node.address.id },
                queryParamsHandling: 'merge'
              });
              node.isLoading = false;
            })
        );
      } else {
        let count = 0;
        for (
          let i = index +1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
        this.dataChange.next(this.data);
        node.isLoading = false;
      }
    }
  }
                
  @Component({
    selector: 'app-profile-tree',
    templateUrl: './profile-tree.component.html',
    styleUrls: ['./profile-tree.component.scss']
  })
  export class ProfileTreeComponent implements OnInit, OnDestroy {
    treeControl: FlatTreeControl<DynamicFlatNode>;
    dataSource: DynamicDataSource;
    constructor(
      private route: ActivatedRoute,
      private fs: FirestoreService,
      private router: Router
    ) { 
      this.treeControl = new FlatTreeControl<DynamicFlatNode>(
        this.getLevel,
        this.isExpandable
      );
      this.dataSource = new DynamicDataSource(
        this.treeControl,
        this.route,
        this.fs,
        this.router
      );
    }
    
    ngOnInit() { }

    ngOnDestroy() {
      this.dataSource.subscriptions.forEach(s => {
        s.unsubscribe();
      });
    }

    address(node: DynamicFlatNode) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { addressId: node.address.id },
        queryParamsHandling: 'merge'
      });
    }
    
    getLevel = (node: DynamicFlatNode) => node.level;

    isExpandable = (node: DynamicFlatNode) => node.expandable;

    hadChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  }
                