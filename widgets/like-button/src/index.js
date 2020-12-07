import { h } from 'preact';
import habitat from 'preact-habitat';
import { setup } from 'goober';
import App from './App';

setup(h);

const { render } = habitat(App);

/**
 ** other selecors options:
 **
 ** ".classname"  for querying DOM element by its class name
 **
 ** "#div-id"  for querying DOM element by its ID value
 **
 ** "[data-attribute-example='widget-here']"  for querying DOM element by its data attribute name & val
 **
 **/

render({ inline: true });
