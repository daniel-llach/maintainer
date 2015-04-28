# maintainer
maintainer app with handles layouts

## Use

### Maintainer Model (layout)
Config model settings of your maintainer. Composite the **regions** where goes the **components**

```
var MaintainerModel = Backbone.Model.extend({
        defaults: {
            title: "MANTENEDOR DE FRANJAS",
            layout: "columnHeaderMainflip", // fullpage, columnHeaderMainflip
            behaviour: []
        }
    });
```

> title: 
  The title of the maintainer.
  
> layout:
  The composite regions view.
  Nomenclature is a description to the top/left screen to the bottom/right
  Ej:
    - main 
    - columnHeaderMainFlip
    - mainFlip
    - columnMain // not yet
    - MainColumn // not yet
    - mainMainSecond // not yet
    

### Maintainer 
Descript the 3 region from the maintainer, this no relevant but is necesary to give interactivity later with news buttons or components outer to the container region.

```
var MaintainerLayout = Marionette.LayoutView.extend({
        el: "#mainRegion",
        tagName: "div",
        className: "maintainer",
        template: _.template(TemplateMaintainer),
        regions: {
            headerLeft: ".header .left",
            headerRight: ".header .right",
            container: ".container"
        }
    });
```

