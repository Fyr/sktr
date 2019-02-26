// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        if (!console[method]) {
            console[method] = noop;
        }
    }
}());




/*[1.0] CUSTOM SELECTBOX PLUGIN */
/***** CUSTOM SELECTBOX *****/
/*
    jQuery-SelectBox
    
    Traditional select elements are very difficult to style by themselves, 
    but they are also very usable and feature rich. This plugin attempts to 
    recreate all selectbox functionality and appearance while adding 
    animation and stylability.
    
    This product includes software developed 
    by RevSystems, Inc (http://www.revsystems.com/) and its contributors
    
    Please see the accompanying LICENSE.txt for licensing information.
*/

(function( $, window, undefined ) {
    // utility functions
    $.fn.borderWidth = function() { return $(this).outerWidth() - $(this).innerWidth(); };
    $.fn.paddingWidth = function() { return $(this).innerWidth() - $(this).width(); };
    $.fn.extraWidth = function() { return $(this).outerWidth(true) - $(this).width(); };
    $.fn.offsetFrom = function( e ) {
        var $e = $(e);
        return {
            left: $(this).offset().left - $e.offset().left,
            top: $(this).offset().top - $e.offset().top
        };
    };
    $.fn.maxWidth = function() {
        var max = 0;
        $(this).each(function() {
            if($(this).width() > max) {
              max = $(this).width();
            }
        });
        return max;
    };
    $.fn.triggerAll = function(event, params) {
      return $(this).each(function() {
        $(this).triggerHandler(event, params);
      });
    };
    var aps = Array.prototype.slice,
        randInt = function() {
            return Math.floor(Math.random() * 999999999);
        };
    
    // jQuery-Proto
    $.proto = function() {
        var name = arguments[0],    // The name of the jQuery function that will be called
            clazz = arguments[1],   // A reference to the class that you are associating
            klazz = clazz,          // A version of clazz with a delayed constructor
            extOpt = {},            // used to extend clazz with a variable name for the init function
            undefined;              // safety net
        
        opts = $.extend({
            elem: "elem",           // the property name on the object that will be set to the current jQuery context
            access: "access",       // the name of the access function to be set on the object
            init: "init",           // the name of the init function to be set on the object
            instantAccess: false    // when true, treat all args as access args (ignore constructor args) and allow construct/function call at the same time
        }, arguments[2]);
        
        if(clazz._super) {
            extOpt[opts.init] = function(){};
            klazz = clazz.extend(extOpt);
        }
        
        $.fn[name] = function() {
            var result, args = arguments;
                
            $(this).each(function() {
                var $e = $(this),
                    obj = $e.data(name),
                    isNew = !obj;
                
                // if the object is not defined for this element, then construct
                if(isNew) {
                    
                    // create the new object and restore init if necessary
                    obj = new klazz();
                    if(clazz._super) {
                      obj[opts.init] = clazz.prototype.init;
                    }
                    
                    // set the elem property and initialize the object
                    obj[opts.elem] = $e[0];
                    if(obj[opts.init]) {
                        obj[opts.init].apply(obj, opts.instantAccess ? [] : aps.call(args, 0));
                    }
                    
                    // associate it with the element
                    $e.data(name, obj);
                    
                }
                
                // if it is defined or we allow instance access, then access
                if(!isNew || opts.instantAccess) {
                  
                    // call the access function if it exists (allows lazy loading)
                    if(obj[opts.access]) {
                        obj[opts.access].apply(obj, aps.call(args, 0));
                    }
                    
                    // do something with the object
                    if(args.length > 0) {
                    
                        if($.isFunction(obj[args[0]])) {
                        
                            // use the method access interface
                            result = obj[args[0]].apply(obj, aps.call(args, 1));
                            
                        } else if(args.length === 1) {
                          
                            // just retrieve the property (leverage deep access with getObject if we can)
                            if($.getObject) {
                              result = $.getObject(args[0], obj);
                            } else {
                              result = obj[args[0]];
                            }
                            
                        } else {
                          
                            // set the property (leverage deep access with setObject if we can)
                            if($.setObject) {
                              $.setObject(args[0], args[1], obj);
                            } else {
                              obj[args[0]] = args[1];
                            }
                            
                        }
                        
                    } else if(result === undefined) {
                    
                        // return the first object if there are no args
                        result = $e.data(name);
                        
                    }
                }
            });
            
            // chain if no results were returned from the clazz's method (it's a setter)
            if(result === undefined) {
              return $(this);
            }
            
            // return the first result if not chaining
            return result;
        };
    };
    
    var falseFunc = function() {
            return false;
        },
        SelectBox = function() {
        
        var self = this,
            o = {},
            $orig = null,
            $label = null,
            $sb = null,
            $display = null,
            $dd = null,
            $items = null,
            searchTerm = "",
            cstTimeout = null,
            delayReloadTimeout = null,
            resizeTimeout = null,
            
            // functions
            loadSB,
            createOption,
            focusOrig,
            blurOrig,
            destroySB,
            reloadSB,
            delayReloadSB,
            openSB,
            centerOnSelected,
            closeSB,
            positionSB,
            positionSBIfOpen,
            delayPositionSB,
            clickSB,
            clickSBItem,
            keyupSB,
            keydownSB,
            focusSB,
            blurSB,
            addHoverState,
            removeHoverState,
            addActiveState,
            removeActiveState,
            getDDCtx,
            getSelected,
            getEnabled,
            selectItem,
            clearSearchTerm,
            findMatchingItem,
            selectMatchingItem,
            selectNextItemStartsWith,
            closeAll,
            closeAllButMe,
            closeAndUnbind,
            blurAllButMe,
            stopPageHotkeys,
            flickerDisplay,
            unbind;
        
        loadSB = function() {
            
            // create the new sb
            $sb = $("<div class='sb " + o.selectboxClass + " " + $orig.attr("class") + "' id='sb" + randInt() + "'></div>")
                .attr("role", "listbox")
                .attr("aria-has-popup", "true")
                .attr("aria-labelledby", $label.attr("id") ? $label.attr("id") : "");
            $("body").append($sb);
            
            // generate the display markup
            var displayMarkup = $orig.children().size() > 0
                ? o.displayFormat.call($orig.find("option:selected")[0], 0, 0)
                : "&nbsp;";
            $display = $("<div class='display " + $orig.attr("class") + "' id='sbd" + randInt() + "'></div>")
                .append($("<div class='text'></div>").append(displayMarkup))
                .append(o.arrowMarkup);
            $sb.append($display);
            
            // generate the dropdown markup
            $dd = $("<ul class='" + o.selectboxClass + " items " + $orig.attr("class") + "' role='menu' id='sbdd" + randInt() + "'></ul>")
                .attr("aria-hidden", "true");
            $sb.append($dd)
                .attr("aria-owns", $dd.attr("id"));
            if($orig.children().size() === 0) {
                $dd.append(createOption().addClass("selected"));
            } else {
                $orig.children().each(function( i ) {
                    var $opt, $og, $ogItem, $ogList;
                    if($(this).is("optgroup")) {
                        $og = $(this);
                        $ogItem = $("<li class='optgroup'>" + o.optgroupFormat.call($og[0], i+1) + "</li>")
                            .addClass($og.is(":disabled") ? "disabled" : "")
                            .attr("aria-disabled", $og.is(":disabled") ? "true" : "");
                        $ogList = $("<ul class='items'></ul>");
                        $ogItem.append($ogList);
                        $dd.append($ogItem);
                        $og.children("option").each(function() {
                            $opt = createOption($(this), i)
                                .addClass($og.is(":disabled") ? "disabled" : "")
                                .attr("aria-disabled", $og.is(":disabled") ? "true" : "");
                            $ogList.append($opt);
                        });
                    } else {
                        $dd.append(createOption($(this), i));
                    }
                });
            }
            
            // cache all sb items
            $items = $dd.find("li").not(".optgroup");
            
            // for accessibility/styling
            $sb.attr("aria-active-descendant", $items.filter(".selected").attr("id"));
            $dd.children(":first").addClass("first");
            $dd.children(":last").addClass("last");
            
            // modify width based on fixedWidth/maxWidth options
            if(!o.fixedWidth) {
                var largestWidth = $dd.find(".text, .optgroup").maxWidth() + $display.extraWidth() + 1;
                $sb.width(o.maxWidth ? Math.min(o.maxWidth, largestWidth) : largestWidth);
            } else if(o.maxWidth && $sb.width() > o.maxWidth) {
                $sb.width(o.maxWidth);
            }
            
            // place the new markup in its semantic location (hide/show fixes positioning bugs)
            $orig.before($sb).addClass("has_sb").hide().show();
            
            // these two lines fix a div/span display bug on load in ie7
            positionSB();
            flickerDisplay();
            
            // hide the dropdown now that it's initialized
            $dd.hide();
            
            // bind events
            if(!$orig.is(":disabled")) {
                $orig
                    .bind("blur.sb", blurOrig)
                    .bind("focus.sb", focusOrig);
                $display
                    .mouseup(addActiveState)
                    .mouseup(clickSB)
                    .click(falseFunc)
                    .focus(focusSB)
                    .blur(blurSB)
                    .hover(addHoverState, removeHoverState);
                getEnabled()
                    .click(clickSBItem)
                    .hover(addHoverState, removeHoverState);
                $dd.find(".optgroup")
                    .hover(addHoverState, removeHoverState)
                    .click(falseFunc);
                $items.filter(".disabled")
                    .click(falseFunc);
                if(!$.browser.msie || $.browser.version >= 9) {
                    $(window).resize($.throttle ? $.throttle(100, positionSBIfOpen) : delayPositionSB);
                }
            } else {
                $sb.addClass("disabled").attr("aria-disabled");
                $display.click(function( e ) { e.preventDefault(); });
            }
            
            // bind custom events
            $sb.bind("close.sb", closeSB).bind("destroy.sb", destroySB);
            $orig.bind("reload.sb", reloadSB);
            if($.fn.tie && o.useTie) {
                $orig.bind("domupdate.sb", delayReloadSB);
            }
        };
        
        delayPositionSB = function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(positionSBIfOpen, 50);
        };
        
        positionSBIfOpen = function() {
            if($sb.is(".open")) {
                positionSB();
                openSB(true);
            }
        }
        
        // create new markup from an <option>
        createOption = function( $option, index ) {
            if(!$option) { 
                $option = $("<option value=''>&nbsp;</option>");
                index = 0;
            }
            var $li = $("<li id='sbo" + randInt() + "'></li>")
                    .attr("role", "option")
                    .data("orig", $option[0])
                    .data("value", $option ? $option.attr("value") : "")
                    .addClass($option.is(":selected") ? "selected" : "")
                    .addClass($option.is(":disabled") ? "disabled" : "")
                    .attr("aria-disabled", $option.is(":disabled") ? "true" : ""),
                $inner = $("<div class='item'></div>"),
                $text = $("<div class='text'></div>")
                    .html(o.optionFormat.call($option[0], 0, index + 1));
            return $li.append($inner.append($text));
        };
        
        // causes focus if original is focused
        focusOrig = function() {
            blurAllButMe();
            $display.triggerHandler("focus");
        };
        
        // loses focus if original is blurred
        blurOrig = function() {
            if(!$sb.is(".open")) {
                $display.triggerHandler("blur");
            }
        };
        
        // unbind and remove
        destroySB = function( internal ) {
            $sb.remove();
            $orig
                .unbind(".sb")
                .removeClass("has_sb");
            $(window).unbind("resize", delayPositionSB);
            if(!internal) {
                $orig.removeData("sb");
            }
        };
        
        // destroy then load, maintaining open/focused state if applicable
        reloadSB = function() {
            var isOpen = $sb.is(".open"),
                isFocused = $display.is(".focused");
            closeSB(true);
            destroySB(true);
            self.init(o);
            if(isOpen) {
                $orig.focus();
                openSB(true);
            } else if(isFocused) {
                $orig.focus();
            }
        };
        
        // debouncing when useTie === true
        delayReloadSB = function() {
            clearTimeout(delayReloadTimeout);
            delayReloadTimeout = setTimeout(reloadSB, 30);
        };
        
        // when the user clicks outside the sb
        closeAndUnbind = function() {
            $sb.removeClass("focused");
            closeSB();
            unbind();
        };
        
        unbind = function() {
          $(document)
              .unbind("click", closeAndUnbind)
              .unbind("keyup", keyupSB)
              .unbind("keypress", stopPageHotkeys)
              .unbind("keydown", stopPageHotkeys)
              .unbind("keydown", keydownSB);
        };
        
        // trigger all sbs to close
        closeAll = function() {
            $(".sb.open." + o.selectboxClass).triggerAll("close");
        };
        
        // trigger all sbs to blur
        blurAllButMe = function() {
            $(".sb.focused." + o.selectboxClass).not($sb[0]).find(".display").blur();
        };
        
        // to prevent multiple selects open at once
        closeAllButMe = function() {
            $(".sb.open." + o.selectboxClass).not($sb[0]).triggerAll("close");
        };
        
        // hide and reset dropdown markup
        closeSB = function( instantClose ) {
            if($sb.is(".open")) {
                $display.blur();
                $items.removeClass("hover");
                unbind();
                $dd.attr("aria-hidden", "true");
                if(instantClose === true) {
                  $dd.hide();
                  $sb.removeClass("open");
                  $sb.append($dd);
                } else {
                    $dd.fadeOut(o.animDuration, function() {
                        $sb.removeClass("open");
                        $sb.append($dd);
                    });
                }
            }
        };
        
        // since the context can change, we should get it dynamically
        getDDCtx = function() {
            var $ddCtx = null;
            if(o.ddCtx === "self") {
                $ddCtx = $sb;
            } else if($.isFunction(o.ddCtx)) {
                $ddCtx = $(o.ddCtx.call($orig[0]));
            } else {
                $ddCtx = $(o.ddCtx);
            }
            return $ddCtx;
        };
        
        // DRY
        getSelected = function() {
          return $items.filter(".selected");
        };
        
        // DRY
        getEnabled = function() {
          return $items.not(".disabled");
        };
        
        // reposition the scroll of the dropdown so the selected option is centered (or appropriately onscreen)
        centerOnSelected = function() {
            $dd.scrollTop($dd.scrollTop() + getSelected().offsetFrom($dd).top - $dd.height() / 2 + getSelected().outerHeight(true) / 2);
        };
        
        flickerDisplay = function() {
            if($.browser.msie && $.browser.version < 8) {
                $("." + o.selectboxClass + " .display").hide().show(); // fix ie7 display bug
            }
        };
        
        // show, reposition, and reset dropdown markup
        openSB = function( instantOpen ) {
            var dir,
                $ddCtx = getDDCtx();
            blurAllButMe();
            $sb.addClass("open");
            $ddCtx.append($dd);
            dir = positionSB();
            $dd.attr("aria-hidden", "false");
            if(instantOpen === true) {
                $dd.show();
                centerOnSelected();
            } else if(dir === "down") {
                $dd.slideDown(o.animDuration, centerOnSelected);
            } else {
                $dd.fadeIn(o.animDuration, centerOnSelected);
            }
            $orig.focus();
        };
        
        // position dropdown based on collision detection
        positionSB = function() {
            var $ddCtx = getDDCtx(),
                ddMaxHeight = 0,
                ddX = $display.offsetFrom($ddCtx).left,
                ddY = 0,
                dir = "",
                ml, mt,
                bottomSpace, topSpace,
                bottomOffset, spaceDiff,
                bodyX, bodyY;
            
            // modify dropdown css for getting values
            $dd.removeClass("above");
            $dd.show().css({
                maxHeight: "none",
                position: "relative",
                visibility: "hidden"
            });
            if(!o.fixedWidth) {
              $dd.width($display.outerWidth() - $dd.extraWidth() + 1);
            }
            
            // figure out if we should show above/below the display box
            bottomSpace = $(window).scrollTop() + $(window).height() - $display.offset().top - $display.outerHeight();
            topSpace = $display.offset().top - $(window).scrollTop();
            bottomOffset = $display.offsetFrom($ddCtx).top + $display.outerHeight();
            spaceDiff = bottomSpace - topSpace + o.dropupThreshold;
            if($dd.outerHeight() < bottomSpace) {
                ddMaxHeight = o.maxHeight ? o.maxHeight : bottomSpace;
                ddY = bottomOffset;
                dir = "down";
            } else if($dd.outerHeight() < topSpace) {
                ddMaxHeight = o.maxHeight ? o.maxHeight : topSpace;
                ddY = $display.offsetFrom($ddCtx).top - Math.min(ddMaxHeight, $dd.outerHeight());
                dir = "up";
            } else if(spaceDiff >= 0) {
                ddMaxHeight = o.maxHeight ? o.maxHeight : bottomSpace;
                ddY = bottomOffset;
                dir = "down";
            } else if(spaceDiff < 0) {
                ddMaxHeight = o.maxHeight ? o.maxHeight : topSpace;
                ddY = $display.offsetFrom($ddCtx).top - Math.min(ddMaxHeight, $dd.outerHeight());
                dir = "up";
            } else {
                ddMaxHeight = o.maxHeight ? o.maxHeight : "none";
                ddY = bottomOffset;
                dir = "down";
            }
            
            ml = ("" + $("body").css("margin-left")).match(/^\d+/) ? $("body").css("margin-left") : 0;
            mt = ("" + $("body").css("margin-top")).match(/^\d+/) ? $("body").css("margin-top") : 0;
            bodyX = $().jquery >= "1.4.2"
                ? parseInt(ml)
                : $("body").offset().left;
            bodyY = $().jquery >= "1.4.2"
                ? parseInt(mt)
                : $("body").offset().top;
            
            
            // modify dropdown css for display
            $dd.hide().css({
                left: ddX + ($ddCtx.is("body") ? bodyX : 0),
                maxHeight: ddMaxHeight,
                position: "absolute",
                top: ddY + ($ddCtx.is("body") ? bodyY : 0),
                visibility: "visible"
            });
            if(dir === "up") {
              $dd.addClass("above");
            }
            return dir;
        };
        
        // when the user explicitly clicks the display
        clickSB = function( e ) {
            if($sb.is(".open")) {
                closeSB();
            } else {
                openSB();
            }
            return false;
        };
        
        // when the user selects an item in any manner
        selectItem = function() {
            var $item = $(this),
                oldVal = $orig.val(),
                newVal = $item.data("value");
            
            // update the original <select>
            $orig.find("option").each(function() { this.selected = false; });
            $($item.data("orig")).each(function() { this.selected = true; });
            
            // change the selection to this item
            $items.removeClass("selected");
            $item.addClass("selected");
            $sb.attr("aria-active-descendant", $item.attr("id"));
            
            // update the title attr and the display markup
            $display.find(".text").attr("title", $item.find(".text").html());
            $display.find(".text").html(o.displayFormat.call($item.data("orig")));
            
            // trigger change on the old <select> if necessary
            if(oldVal !== newVal) {
                $orig.change();
            }
        };
        
        // when the user explicitly clicks an item
        clickSBItem = function( e ) {
            closeAndUnbind();
            $orig.focus();
            selectItem.call(this);
            return false;
        };
        
        // start over for generating the search term
        clearSearchTerm = function() {
            searchTerm = "";
        };
        
        // iterate over all the options to see if any match the search term
        findMatchingItem = function( term ) {
            var i, t, $tNode,
                $available = getEnabled();
            for(i=0; i < $available.size(); i++) {
                $tNode = $available.eq(i).find(".text");
                t = $tNode.children().size() == 0 ? $tNode.text() : $tNode.find("*").text();
                if(term.length > 0 && t.toLowerCase().match("^" + term.toLowerCase())) {
                    return $available.eq(i);
                }
            }
            return null;
        };
        
        // if we get a match for any options, select it
        selectMatchingItem = function( text ) {
            var $matchingItem = findMatchingItem(text);
            if($matchingItem !== null) {
                selectItem.call($matchingItem[0]);
                return true;
            }
            return false;
        };
        
        // stop up/down/backspace/space from moving the page
        stopPageHotkeys = function( e ) {
            if(e.ctrlKey || e.altKey) {
                return;
            }
            if(e.which === 38 || e.which === 40 || e.which === 8 || e.which === 32) {
                e.preventDefault();
            }
        };
        
        // if a normal match fails, try matching the next element that starts with the pressed letter
        selectNextItemStartsWith = function( c ) {
            var i, t,
                $selected = getSelected(),
                $available = getEnabled();
            for(i = $available.index($selected) + 1; i < $available.size(); i++) {
                t = $available.eq(i).find(".text").text();
                if(t !== "" && t.substring(0,1).toLowerCase() === c.toLowerCase()) {
                    selectItem.call($available.eq(i)[0]);
                    return true;
                }
            }
            return false;
        };
        
        // go up/down using arrows or attempt to autocomplete based on string
        keydownSB = function( e ) {
            if(e.altKey || e.ctrlKey) {
                return false;
            }
            var $selected = getSelected(),
                $enabled = getEnabled();
            switch(e.which) {
            case 9: // tab
                closeSB();
                blurSB();
                break;
            case 35: // end
                if($selected.size() > 0) {
                    e.preventDefault();
                    selectItem.call($enabled.filter(":last")[0]);
                    centerOnSelected();
                }
                break;
            case 36: // home
                if($selected.size() > 0) {
                    e.preventDefault();
                    selectItem.call($enabled.filter(":first")[0]);
                    centerOnSelected();
                }
                break;
            case 38: // up
                if($selected.size() > 0) {
                    if($enabled.filter(":first")[0] !== $selected[0]) {
                        e.preventDefault();
                        selectItem.call($enabled.eq($enabled.index($selected)-1)[0]);
                    }
                    centerOnSelected();
                }
                break;
            case 40: // down
                if($selected.size() > 0) {
                    if($enabled.filter(":last")[0] !== $selected[0]) {
                        e.preventDefault();
                        selectItem.call($enabled.eq($enabled.index($selected)+1)[0]);
                        centerOnSelected();
                    }
                } else if($items.size() > 1) {
                    e.preventDefault();
                    selectItem.call($items.eq(0)[0]);
                }
                break;
            default:
                break;
            }
        };
        
        // the user is typing -- try to select an item based on what they press
        keyupSB = function( e ) {
            if(e.altKey || e.ctrlKey) {
              return false;
            }
            if(e.which !== 38 && e.which !== 40) {
                
                // add to the search term
                searchTerm += String.fromCharCode(e.keyCode);
                
                if(selectMatchingItem(searchTerm)) {
                
                    // we found a match, continue with the current search term
                    clearTimeout(cstTimeout);
                    cstTimeout = setTimeout(clearSearchTerm, o.acTimeout);
                    
                } else if(selectNextItemStartsWith(String.fromCharCode(e.keyCode))) {
                    
                    // we selected the next item that starts with what you just pressed
                    centerOnSelected();
                    clearTimeout(cstTimeout);
                    cstTimeout = setTimeout(clearSearchTerm, o.acTimeout);
                    
                } else {
                    
                    // no matches were found, clear everything
                    clearSearchTerm();
                    clearTimeout(cstTimeout);
                    
                }
            }
        };
        
        // when the sb is focused (by tab or click), allow hotkey selection and kill all other selectboxes
        focusSB = function() {
            closeAllButMe();
            $sb.addClass("focused");
            $(document)
                .click(closeAndUnbind)
                .keyup(keyupSB)
                .keypress(stopPageHotkeys)
                .keydown(stopPageHotkeys)
                .keydown(keydownSB);
        };
        
        // when the sb is blurred (by tab or click), disable hotkey selection
        blurSB = function() {
            $sb.removeClass("focused");
            $display.removeClass("active");
            $(document)
                .unbind("keyup", keyupSB)
                .unbind("keydown", stopPageHotkeys)
                .unbind("keypress", stopPageHotkeys)
                .unbind("keydown", keydownSB);
        };
        
        // add hover class to an element
        addHoverState = function() {
          $(this).addClass("hover");
        };
        
        // remove hover class from an element
        removeHoverState = function() {
          $(this).removeClass("hover");
        };
        
        // add active class to the display
        addActiveState = function() {
          $display.addClass("active");
          $(document).bind("mouseup", removeActiveState);
        };
        
        // remove active class from an element
        removeActiveState = function() {
          $display.removeClass("active");
          $(document).unbind("mouseup", removeActiveState);
        };
        
        // constructor
        this.init = function( opts ) {
            
            // this plugin is not compatible with IE6 and below;
            // a normal <select> will be displayed for old browsers
            if($.browser.msie && $.browser.version < 7) {
              return;
            }
        
            // get the original <select> and <label>
            $orig = $(this.elem);
            if($orig.attr("id")) {
                $label = $("label[for='" + $orig.attr("id") + "']:first");
            }
            if(!$label || $label.size() === 0) {
                $label = $orig.closest("label");
            }
            
            // don't create duplicate SBs
            if($orig.hasClass("has_sb")) {
                return;
            }
            
            // set the various options
            o = $.extend({
                acTimeout: 800,               // time between each keyup for the user to create a search string
                animDuration: 200,            // time to open/close dropdown in ms
                ddCtx: 'body',                // body | self | any selector | a function that returns a selector (the original select is the context)
                dropupThreshold: 150,         // the minimum amount of extra space required above the selectbox for it to display a dropup
                fixedWidth: false,            // if false, dropdown expands to widest and display conforms to whatever is selected
                maxHeight: false,             // if an integer, show scrollbars if the dropdown is too tall
                maxWidth: false,              // if an integer, prevent the display/dropdown from growing past this width; longer items will be clipped
                selectboxClass: 'selectbox',  // class to apply our markup
                useTie: false,                // if jquery.tie is included and this is true, the selectbox will update dynamically
                
                // markup appended to the display, typically for styling an arrow
                arrowMarkup: "<div class='arrow_btn'><span class='arrow'></span></div>",
                
                // use optionFormat by default
                displayFormat: undefined,
                
                // formatting for the display; note that it will be wrapped with <a href='#'><span class='text'></span></a>
                optionFormat: function( ogIndex, optIndex ) {
                    if($(this).size() > 0) {
                        var label = $(this).attr("label");
                        if(label && label.length > 0) {
                          return label;
                        }
                        return $(this).text();
                    } else {
                        return "";
                    }
                },
                
                // the function to produce optgroup markup
                optgroupFormat: function( ogIndex ) {
                    return "<span class='label'>" + $(this).attr("label") + "</span>";
                }
            }, opts);
            o.displayFormat = o.displayFormat || o.optionFormat;
            
            // generate the new sb
            loadSB();
        };
        
        // public method interface
        this.open = openSB;
        this.close = closeSB;
        this.refresh = reloadSB;
        this.destroy = destroySB;
        this.options = function( opts ) {
            o = $.extend(o, opts);
            reloadSB();
        };
    };

    $.proto("sb", SelectBox);

}(jQuery, window));




/*** [2.0] BXSLIDER ***/
/**
 * BxSlider v4.1.1 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2012, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:v()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:50,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).is("img")&&t(this).attr("src",t(this).attr("src")+"?timestamp="+(new Date).getTime()),t(this).load(function(){setTimeout(function(){++n==s&&i()},0)})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(p()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",B),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&I(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},p=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},v=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.delegate("a","click",q)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.delegate(".bx-start","click",k),o.controls.autoEl.delegate(".bx-stop","click",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},q=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},I=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),"horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0)}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},B=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider())};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&I(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",51).fadeIn(o.settings.speed,function(){t(this).css("zIndex",50),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=p()&&o.viewport.animate({height:p()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",p()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),I(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",B))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);


/*** [3.0] IE PLACEHOLDRE FALLBACK ***/
var _debug = false;var _placeholderSupport = function() {var t = document.createElement("input");t.type = "text";return (typeof t.placeholder !== "undefined");}();window.onload = function() {var arrInputs = document.getElementsByTagName("input");for (var i = 0; i < arrInputs.length; i++) {var curInput = arrInputs[i];if (!curInput.type || curInput.type == "" || curInput.type == "text")HandlePlaceholder(curInput);}};function HandlePlaceholder(oTextbox) {if (!_placeholderSupport) {var curPlaceholder = oTextbox.getAttribute("placeholder");if (curPlaceholder && curPlaceholder.length > 0) {Debug("Placeholder found for input box '" + oTextbox.name + "': " + curPlaceholder);oTextbox.value = curPlaceholder;oTextbox.setAttribute("old_color", oTextbox.style.color);oTextbox.style.color = "#c0c0c0";oTextbox.onfocus = function() {Debug("input box '" + this.name + "' focus");this.style.color = this.getAttribute("old_color");if (this.value === curPlaceholder)this.value = "";};oTextbox.onblur = function() {Debug("input box '" + this.name + "' blur");if (this.value === "") {this.style.color = "#c0c0c0";this.value = curPlaceholder;}};}else {Debug("input box '" + oTextbox.name + "' does not have placeholder attribute");}}else {Debug("browser has native support for placeholder");}}function Debug(msg) {if (typeof _debug !== "undefined" && _debug) {var oConsole = document.getElementById("Console");if (!oConsole) {oConsole = document.createElement("div");oConsole.id = "Console";document.body.appendChild(oConsole);}oConsole.innerHTML += msg + "<br />";}}

/*** [4.0] fancybox ***/
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
