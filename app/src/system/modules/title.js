'use strict';

module.exports = function (ngModule, Angular) {
    let documentTitleCallback = undefined;
    let defaultDocumentTitle = document.title;

    Angular.module("signApp.title", ["ui.router"])
        .provider("$title", function $titleProvider() {
            return {
                documentTitle: function (cb) {
                    documentTitleCallback = cb;
                },
                $get: ["$state", function ($state) {
                        return {
                            title: function () {
                                return getTitleValue($state.$current.locals.globals["$title"]);
                            },
                            breadCrumbs: function () {
                                var $breadcrumbs = [];

                                var state = $state.$current;

                                while (state) {
                                    if (state["resolve"] && state["resolve"].$title) {
                                        $breadcrumbs.unshift({
                                            title: getTitleValue(state.locals.globals["$title"]),
                                            state: state["self"].name,
                                            stateParams: state.locals.globals["$stateParams"]
                                        });
                                    }

                                    state = state["parent"];
                                }

                                return $breadcrumbs;
                            }
                        };
                    }]
            };
        })
        .run(function ($rootScope, $timeout, $title, $injector) {
            $rootScope.$on("$stateChangeSuccess", function () {
                let title = $title.title();

                $timeout(function () {
                    $rootScope.$title = title;

                    let documentTitle = documentTitleCallback ? $injector.invoke(documentTitleCallback, this, $rootScope) : title || defaultDocumentTitle;

                    document.title = documentTitle;
                });

                $rootScope.$breadcrumbs = $title.breadCrumbs();
            });
        });

    function getTitleValue(title) {
        return Angular.isFunction(title) ? title() : title;
    }
};