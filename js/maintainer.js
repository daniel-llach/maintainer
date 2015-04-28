define([
	"backbone.marionette",
	"backbone.radio",
	"radio.shim",
    "text!templates/maintainer.html",
    "text!regions/templates/fullpage.html",
    "text!regions/templates/columnHeaderMainflip.html"
], function (Marionette, Radio, Shim, TemplateMaintainer, FullPageTemplate, ColumnHeaderMainflip) {

	var Maintainer = new Marionette.Application();

    var MaintainerModel = Backbone.Model.extend({
        defaults: {
            title: "MANTENEDOR DE FRANJAS",
            layout: "columnHeaderMainflip", // fullpage, columnHeaderMainflip
            behaviour: []
        }
    });

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

    var currentMaintainerModel = new MaintainerModel();

    Maintainer.MaintainerLayout = new MaintainerLayout({model: currentMaintainerModel});
    Maintainer.MaintainerLayout.render();

    // Modulo regions
    Maintainer.module("Regions", function(Regions, Maintainer, Backbone, Marionette, $, _, currentMaintainerModel){
        // settings
        var layout = currentMaintainerModel.get("layout");
        // var behaviour = currentMaintainerModel.get("behaviour");
        if(layout == "fullpage"){
            template = FullPageTemplate;
        }else if(layout == "columnHeaderMainflip"){
            template = ColumnHeaderMainflip;
            console.log(layout);
        }



        Regions.RegionsLayoutView = Marionette.LayoutView.extend({
            el: Maintainer.MaintainerLayout.regions.container,
            template: _.template(template),
            regions: {
                main: ".region .main",
                columnLeft: ".region .columnLeft",
                header: ".region .header",
                mainflip: ".region .mainflip"
            },
            onRender: function() {
                console.log('Regions: onRender');
            },
            initialize: function() {
                console.log('Regions: initialize');
                // console.log('currentMaintainerModel: ', template);
            }
        });

    }, currentMaintainerModel);

    // After render Maintainer
    Maintainer.listenTo(Maintainer, "start", function(){
        console.log("maintainer start");

        var modelRegions = Maintainer.module("Regions");
        var deployRegions = new modelRegions.RegionsLayoutView();
        deployRegions.render();
    });

    // After render Regions
    Maintainer.listenTo(Maintainer.module("Regions"), "start", function(){
        console.log("Regions start");
    });


	// var channel = Radio.channel('global');
    // console.log(channel);

    // App = new Marionette.Application();
    // App.listenTo(App, "start", function(){
    //     alert("Hello World!");
    // });
    return Maintainer;
});
