/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMIframe
 */

'use strict';

var assign = require('Object.assign');
var EventConstants = require('EventConstants');
var LocalEventTrapMixin = require('LocalEventTrapMixin');
var ReactBrowserComponentMixin = require('ReactBrowserComponentMixin');
var ReactClassMixin = require('ReactClassMixin');
var ReactElement = require('ReactElement');

var iframe = ReactElement.createFactory('iframe');

/**
 * Since onLoad doesn't bubble OR capture on the top level in IE8, we need to
 * capture it on the <iframe> element itself. There are lots of hacks we could
 * do to accomplish this, but the most reliable is to make <iframe> a composite
 * component and use `componentDidMount` to attach the event handlers.
 */
function ReactDOMIframe(props, context) {
  this.props = props;
  this.context = context;
}
ReactDOMIframe.displayName = 'ReactDOMIframe';

assign(
  ReactDOMIframe.prototype,
  LocalEventTrapMixin,
  ReactBrowserComponentMixin,
  ReactClassMixin,
  {
    tagName: 'IFRAME',
    render: function() {
      return iframe(this.props);
    },

    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load');
    }
  }
);

module.exports = ReactDOMIframe;
