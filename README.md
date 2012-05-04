cookieconsent
=============

Basic plugin to easily add an opt-in for EU cookie compliance

Adds a container, a message, opt-in/opt-out links and a link to a read more/privacy page. The message will be displayed on the page it is installed on every time the page is loaded until the visitor opts-in. If/when the visitor opts-in, the message will be removed and a cookie will be set to stop the message being displayed on subsequent visits. By default, the Google Analytics async script will be inserted once the visitor opts-in and on subsequent visits.

This plugin is dependant on jQuery and the jquery.cookie.js plugin.

Hooks for styling are provided and you are encourged to decorate it using CSS.

Usage
-------------

To use without configuration simply include jQuery, the jQuery Cookie Plugin and this plugin (in that order) and then call *$.cookieconsent()* after page load.

Configurable options:

<table>
	<tr>
		<th>Option</th><th>Default setting</th><th>Usage</th>
	</tr>
	<tr>
		<td>containerId</td><td>"consentWidget"</td><td>The id attribute added to the widget container</td>
	</tr>
	<tr>
		<td>message</td><td>"This site wishes to use cookies in order to provide a better experience."</td><td>The message displayed in the widget</td>
	</tr>
	<tr>
		<td>addReadMoreLink</td><td>false</td><td>Adds a link to a read more page to the widget</td>
	</tr>
	<tr>
		<td>readMoreHref</td><td>""</td><td>Sets the href of the read more link. This option must be configured if a read more link is added</td>
	</tr>
	<tr>
		<td>readMoreClass</td><td>"read-more"</td><td>Adds a class name to the read more link</td>
	</tr>
	<tr>
		<td>readMoreText</td><td>"Find out more"</td><td>The text for the read more link</td>
	</tr>
	<tr>
		<td>readMoreRel</td><td>""</td><td>Sets a rel attribute to the read more link</td>
	</tr>
	<tr>
		<td>questionText</td><td>"Do you consent?"</td><td>The text of the consent question</td>
	</tr>
	<tr>
		<td>questionClass</td><td>""</td><td>Adds a class name to the question element (a <span>)</td>
	</tr>
	<tr>
		<td>confirmLinkId</td><td>"yes"</td><td>The id attribute added to the 'yes' consent link</td>
	</tr>
	<tr>
		<td>confirmLinkText</td><td>"Yes"</td><td>The text added to the 'yes' consent link</td>
	</tr>
	<tr>
		<td>confirmLinkClass</td><td>""</td><td>Adds a class name to the 'yes' consent link</td>
	</tr>
	<tr>
		<td>denyLinkId</td><td>"no"</td><td>The id attribute added to the 'no' consent link</td>
	</tr>
	<tr>
		<td>denyLinkText</td><td>"No"</td><td>The text added to the 'no' consent link</td>
	</tr>
	<tr>
		<td>denyLinkClass</td><td>""</td><td>Adds a class name to the 'no' consent link</td>
	</tr>
	<tr>
		<td>widgetContainer</td><td>"#form1"</td><td>The container element the consent widget is added to (works out of the box with .net webforms)</td>
	</tr>
	<tr>
		<td>insertAtBeginning</td><td>true</td><td>Appends the widget to the container element. Set to false to prepend instead</td>
	</tr>
	<tr>
		<td>cookieExpiry</td><td>3650</td><td>The number of days the cookie will live for</td>
	</tr>
	<tr>
		<td>analyticsInject</td><td>[see below*]</td><td>The analytics script injected in the <head> of the page</td>
	</tr>
</table>

Analytics
-------------

By default this plugin injects the standard async Google Analytics tracking code into the head of the page once consent to set cookies has been provided, e.g:

var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);

The widget **does not** set the UA account numberp; this, along with other GA requirements such as *trackPageview*, should be set in the normal way.

Other analytic scripts may be used by overriding the analyticsInject option, for example, to use Get Clicky, you could use this:

    $.cookieconsent({
            analyticsInject: function() {
                var gc = document.createElement('script'); 
                gc.type = 'text/javascript'; 
                gc.src = ('//static.getclicky.com/js');
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gc, s);

                try { clicky.init(#########); } catch (e) {}
            }
        });
		
Where ######### is your Get Clicky account number.