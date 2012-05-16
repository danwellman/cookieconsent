/*
 *   cookie consent jQuery plugin by :Dan Wellman 
 *   © 2012 Dan Wellman & Design Haus UK Ltd
 *   License: GNU GPL v3 ~ http://www.gnu.org/licenses/gpl.html
 *
 *   Requires:
 *   jQuery (obviously)
 *   jquery.cookie.js
 *
 *   version 0.0.4
 */
;(function ($) {
    "use strict";

    $.cookieconsent = function (config) {

        var _config = $.extend({}, $.cookieconsent.defaults, config), container, p, message, uiContainer, question, yes, no, readMore, readMoreContainer;
        
        if ($.cookie) {
            if ($.cookie("cookie_consent")) {
                _config.analyticsInject();
                _config.analyticsInjected();
            } else {
                container = $("<div/>", {
                    id: _config.containerId
                });
                p = $("<p/>").appendTo(container);

                message = $("<" + _config.messageContainer + "/>", {
                    text: _config.message
                }).addClass(_config.messageClass).appendTo(p);

                uiContainer = $("<" + _config.uiContainer + "/>").appendTo(p);

                question = $("<span/>", {
                    text: _config.questionText
                }).appendTo(uiContainer);

                yes = $("<a/>", {
                    id: _config.confirmLinkId,
                    text: _config.confirmLinkText,
                    href: "#",
                    click: function (e) {
                        e.preventDefault();
                        
                        _config.consented();

                        _config.analyticsInject();
                        _config.analyticsInjected();

                        $.cookie("cookie_consent", "consented", { expires: _config.cookieExpiry, path: "/" });
                        _config.cookieSet();

                        $("#" + _config.containerId).remove();
                    }
                }).appendTo(uiContainer);

                no = $("<a/>", {
                    id: _config.denyLinkId,
                    text: _config.denyLinkText,
                    href: "#",
                    click: function (e) {
                        e.preventDefault();
                        _config.denied();

                        $("#" + _config.containerId).remove();
                    }
                }).appendTo(uiContainer);

                //add classes to elements links if configured
                if (_config.uiClass) {
                    uiContainer.addClass(_config.uiClass);
                }
                if (_config.questionClass) {
                    question.addClass(_config.questionClass);
                }
                if (_config.confirmLinkClass) {
                    yes.addClass(_config.confirmLinkClass);
                }
                if (_config.denyLinkClass) {
                    no.addClass(_config.denyLinkClass);
                }
                
                //add a readmore link if configured
                if (_config.addReadMoreLink && _config.readMoreHref) {
                    readMore = $("<a/>", {
                        href: _config.readMoreHref,
                        text: _config.readMoreText
                    });

                    if (_config.readMoreContainer) {
                        readMoreContainer = $("<" + _config.readMoreContainer + ">").appendTo(p);
                        readMore.appendTo(readMoreContainer);

                        if (_config.readMoreContainerClass) {
                            readMoreContainer.addClass(_config.readMoreContainerClass);
                        }
                    } else {
                        readMore.appendTo(p);
                    }

                    if (_config.readMoreClass) {
                        readMore.addClass(_config.readMoreClass);
                    }
                    if (_config.readMoreRel) {
                        readMore.attr("rel", _config.readMoreRel);
                    }
                } else if (_config.addReadMoreLink && !_config.readMoreHref) {
                    console.log("Configuration error: Please remember to set the href when adding a read more link");
                }

                //append to start or end of specified container
                if (_config.insertAtBeginning) {
                    container.prependTo(_config.widgetContainer);
                    _config.displayed();
                } else {
                    container.appendTo(_config.widgetContainer);
                    _config.displayed();
                }
            }
        } else {
            console.log("Dependency error: Please ensure the cookie plugin is available");
        } 
    }

    $.cookieconsent.defaults = {
        containerId: "consentWidget",
        message: "This site wishes to use cookies in order to provide a better experience.",
        messageContainer: "span",
        messageClass: "message",
        addReadMoreLink: false,
        readMoreHref: "",
        readMoreClass: "read-more",
        readMoreText: "Find out more",
        readMoreRel: "",
        readMoreContainer: "",
        readMoreContainerClass: "",
        uiContainer: "fieldset",
        uiClass: "",
        questionText: "Do you consent?",
        questionClass: "",
        confirmLinkId: "yes",
        confirmLinkText: "Yes",
        confirmLinkClass: "",
        denyLinkId: "no",
        denyLinkText: "No",
        denyLinkClass: "",
        widgetContainer: "#form1",
        insertAtBeginning: true,
        cookieExpiry: 3650,
        analyticsInject: function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        },
        displayed: function() {},
        consented: function() {},
        denied: function() {},
        cookieSet: function() {},
        analyticsInjected: function() {} 
    }

    $.fn.cookieconsent = function(config) {
        $.cookieconsent(config);
    }
}(jQuery));