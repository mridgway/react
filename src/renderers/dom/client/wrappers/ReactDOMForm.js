/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMForm
 */

'use strict';

var assign = require('Object.assign');
var EventConstants = require('EventConstants');
var LocalEventTrapMixin = require('LocalEventTrapMixin');
var ReactBrowserComponentMixin = require('ReactBrowserComponentMixin');
var ReactClassMixin = require('ReactClassMixin');
var ReactElement = require('ReactElement');

var form = ReactElement.createFactory('form');

/**
 * Since onSubmit doesn't bubble OR capture on the top level in IE8, we need
 * to capture it on the <form> element itself. There are lots of hacks we could
 * do to accomplish this, but the most reliable is to make <form> a
 * composite component and use `componentDidMount` to attach the event handlers.
 */
function ReactDOMForm(props, context) {
  this.props = props;
  this.context = context;
}
ReactDOMForm.displayName = 'ReactDOMForm';

assign(
  ReactDOMForm.prototype,
  LocalEventTrapMixin,
  ReactBrowserComponentMixin,
  ReactClassMixin,
  {
    tagName: 'FORM',
    render: function() {
      // TODO: Instead of using `ReactDOM` directly, we should use JSX. However,
      // `jshint` fails to parse JSX so in order for linting to work in the open
      // source repo, we need to just use `ReactDOM.form`.
      return form(this.props);
    },

    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset');
      this.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit');
    }
  }
);

module.exports = ReactDOMForm;
