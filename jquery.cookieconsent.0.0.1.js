/*
 *   cookie consent jQuery plugin by :Dan Wellman 
 *   © 2012 Dan Wellman & Design Haus UK Ltd
 *   License: GNU GPL v3 ~ http://www.gnu.org/licenses/gpl.html
 *
 *   Requires:
 *   jQuery (obviously)
 *   jquery.cookie.js
 *
 *   version 0.0.1
 */
;(function ($) {
    "use strict";

    $.cookieconsent = function (config) {

        var _config = $.extend({}, $.cookieconsent.defaults, config), container, p, question, yes, no, readMore;
        
        if ($.cookie) {
            if ($.cookie("cookie_consent")) {
                _config.analyticsInject();
            } else {
                container = $("<div/>", {
                    id: _config.containerId
                });
                p = $("<p/>", {
                    html: _config.message
                }).appendTo(container);

                question = $("<span/>", {
                    text: _config.questionText
                }).appendTo(p);

                yes = $("<a/>", {
                    id: _config.confirmLinkId,
                    text: _config.confirmLinkText,
                    href: "#",
                    click: function (e) {
                        e.preventDefault();
                        _config.analyticsInject();

                        $.cookie("cookie_consent", "consented", { expires: _config.cookieExpiry, path: "/" });
                        $("#" + _config.containerId).remove();
                    }
                }).appendTo(p);

                no = $("<a/>", {
                    id: _config.denyLinkId,
                    text: _config.denyLinkText,
                    href: "#",
                    click: function (e) {
                        e.preventDefault();
                        $("#" + _config.containerId).remove();
                    }
                }).appendTo(p);

                //add classes to elements links if configured
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
                    }).appendTo(p);

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
                } else {
                    container.appendTo(_config.widgetContainer);
                }
            }
        } else {
            console.log("Dependency error: Please ensure the cookie plugin is available");
        } 
    }

    $.cookieconsent.defaults = {
        containerId: "consentWidget",
        message: "This site wishes to use cookies in order to provide a better experience.",
        addReadMoreLink: false,
        readMoreHref: "",
        readMoreClass: "read-more",
        readMoreText: "Find out more",
        readMoreRel: "",
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
        }
    }

    $.fn.cookieconsent = function(config) {
        $.cookieconsent(config);
    }
}(jQuery));