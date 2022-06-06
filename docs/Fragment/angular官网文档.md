### 1、获取当前路由

> 路由参数与你在此路由中定义的路径变量相对应。要访问路由参数，我们使用 route.snapshot，它是一个 [ActivatedRouteSnapshot](https://angular.cn/api/router/ActivatedRouteSnapshot)，其中包含有关该特定时刻的活动路由信息。

```tsx
import { ActivatedRoute } from '@angular/router';
export class ProductDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }
    ngOnInit() {
      // 获取当前活动路由信息
      const routeParams = this.route.snapshot.paramMap;
      const productIdFromRoute = Number(routeParams.get('productId'));

      // Find the product that correspond with the id provided in route.
      this.product = products.find(product => product.id === productIdFromRoute);
    }
}
```

### 2、declarations 用来声明组件

<img src="https://raw.githubusercontent.com/305088020/Pictures/main/202204282218308.png" alt="image-20220427204353653" style="zoom: 33%;" />

### 3、async 管道从数据流中返回最新值，并在所属组件的生命期内持续返回

> `async` 管道会订阅一个 `Observable` 或 `Promise`，并返回它发出的最近一个值。 当新值到来时，`async` 管道就会把该组件标记为需要进行变更检测。当组件被销毁时，`async` 管道就会自动取消订阅，以消除潜在的内存泄露问题。

```html
<h3>Shipping Prices</h3>

<!-- async返回最近的一个值 -->
<div class="shipping-item" *ngFor="let shipping of shippingCosts | async">
  <span>{{ shipping.type }}</span>
  <span>{{ shipping.price | currency }}</span>
</div>

```

### 4、使用`FormBuilder` 创建表单

> 每个字段都有一个 `formControlName` 属性，该属性绑定到 `checkoutForm` 表单控件，以将 `name` 和 `address` 绑定到其 `<input>` 字段。完整的组件如下：

```html
<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
  <div>
    <label for="name">
      Name
    </label>
    <input id="name" type="text" formControlName="name">
  </div>
  <div>
    <label for="address">
      Address
    </label>
    <input id="address" type="text" formControlName="address">
  </div>
  <button class="button" type="submit">Purchase</button>
</form>

```

### 5、生命周期

>**ngOnChanges:**
>
>有绑定属性的时候，最开始在 `ngOnInit()` 之前先调用一次。
>
>之后，在值发生变化时都会调用。

```js
ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const propName in changes) {
      const changedProp = changes[propName];
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }
```

### 6、特殊选择器

> `:host` 代表宿主元素，也就是组件本身
>
> `:host-context`  它在当前组件宿主元素的*祖先节点*中查找 CSS 类， 直到文档的根节点为止。它只能与其它选择器组合使用。

### 7、ng-template、ng-content、ng-container区别

> `ng-content`: 相当于`vue`的`solt`，负责子内容的直接显示
>
> `ng-template`：默认的内容不会直接显示，需要借助与其他结构指令或`template-ref`来将内容渲染到页面中
>
> `ng-container`：相当于一个`tag`,可以包裹任何元素，但本身不会生成元素标签，也不会影响页面样式和布局，里面的内容在默认情况下就会渲染到页面。可用于`ngFor`和`ngIf`的一起使用。



```js
<!-- 通过ngIf结构型指令显示ng-template的内容 -->
<div class="lessons-list" *ngIf="condition else elseTemplate">
    判断条件为真
</div>
<ng-template #elseTemplate>
    <div>判断条件为假</div>
</ng-template>
-------------------------------------------
<ng-template #defaultTemplate>
    <div>咱们没有传递参数</div>
</ng-template>
<ng-container *ngTemplateOutlet="inputTemplate ? inputTemplate: defaultTemplate">
</ng-container>
```



```js
<ng-container *ngFor="let item of list;let index=index">
    <li *ngIf="index%2 === 0">
    	{{"index is " + index + " value is " + item}}
    </li>
</ng-container>
```

















