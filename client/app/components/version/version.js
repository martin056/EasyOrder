'use strict';

angular.module('easyOrder.version', [
  'easyOrder.version.interpolate-filter',
  'easyOrder.version.version-directive'
])

.value('version', '0.1');
