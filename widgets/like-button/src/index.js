import habitat from 'preact-habitat';
import App from './App';

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

render({
  selector: '.like-button',
  // defaultProps: undefined, // Default props for all widgets
  // inline: false,
  // clean: false,
  // clientSpecified: false,
});
