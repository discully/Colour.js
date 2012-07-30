/*
 * Colour.js by Daniel I Scully
 * 
 * Class represents a web colour.
 * It accepts colours in any of the formats defined in the W3C's
 * CSS Color Module Level 3.
 * 
 * The state of the class is stored internally as rgba
 * and can be returned in any of the standard web
 * colour formats via the appropriate methods.
 * 
 * Please include the line in quotes below in the credits of any
 * software you use this in:
 * "Uses Colour.js developed by Daniel I Scully (http://danielscully.co.uk)"
 * 
 * Please seek permission if you wish to distribute this in a modified form.
 */
function Colour(col)
{
	
	/* *****************************************************************
	 * Properties
	 */
	
	// Variables defining the current state
	var r = -2;
	var g = -2;
	var b = -2;
	var a = -2;
	
	// Variable dictating whether current state is valid
	var valid = false;
	
	// List of named colours and their rgb values
	var keywords = [['aliceblue',240,248,255],['antiquewhite',250,235,215],['aqua',0,255,255],['aquamarine',127,255,212],['azure',240,255,255],['beige',245,245,220],['bisque',255,228,196],['black',0,0,0],['blanchedalmond',255,235,205],['blue',0,0,255],['blueviolet',138,43,226],['brown',165,42,42],['burlywood',222,184,135],['cadetblue',95,158,160],['chartreuse',127,255,0],['chocolate',210,105,30],['coral',255,127,80],['cornflowerblue',100,149,237],['cornsilk',255,248,220],['crimson',220,20,60],['cyan',0,255,255],['darkblue',0,0,139],['darkcyan',0,139,139],['darkgoldenrod',184,134,11],['darkgray',169,169,169],['darkgreen',0,100,0],['darkgrey',169,169,169],['darkkhaki',189,183,107],['darkmagenta',139,0,139],['darkolivegreen',85,107,47],['darkorange',255,140,0],['darkorchid',153,50,204],['darkred',139,0,0],['darksalmon',233,150,122],['darkseagreen',143,188,143],['darkslateblue',72,61,139],['darkslategray',47,79,79],['darkslategrey',47,79,79],['darkturquoise',0,206,209],['darkviolet',148,0,211],['deeppink',255,20,147],['deepskyblue',0,191,255],['dimgray',105,105,105],['dimgrey',105,105,105],['dodgerblue',30,144,255],['firebrick',178,34,34],['floralwhite',255,250,240],['forestgreen',34,139,34],['fuchsia',255,0,255],['gainsboro',220,220,220],['ghostwhite',248,248,255],['gold',255,215,0],['goldenrod',218,165,32],['gray',128,128,128],['green',0,128,0],['greenyellow',173,255,47],['grey',128,128,128],['honeydew',240,255,240],['hotpink',255,105,180],['indianred',205,92,92],['indigo',75,0,130],['ivory',255,255,240],['khaki',240,230,140],['lavender',230,230,250],['lavenderblush',255,240,245],['lawngreen',124,252,0],['lemonchiffon',255,250,205],['lightblue',173,216,230],['lightcoral',240,128,128],['lightcyan',224,255,255],['lightgoldenrodyellow',250,250,210],['lightgray',211,211,211],['lightgreen',144,238,144],['lightgrey',211,211,211],['lightpink',255,182,193],['lightsalmon',255,160,122],['lightseagreen',32,178,170],['lightskyblue',135,206,250],['lightslategray',119,136,153],['lightslategrey',119,136,153],['lightsteelblue',176,196,222],['lightyellow',255,255,224],['lime',0,255,0],['limegreen',50,205,50],['linen',250,240,230],['magenta',255,0,255],['maroon',128,0,0],['mediumaquamarine',102,205,170],['mediumblue',0,0,205],['mediumorchid',186,85,211],['mediumpurple',147,112,219],['mediumseagreen',60,179,113],['mediumslateblue',123,104,238],['mediumspringgreen',0,250,154],['mediumturquoise',72,209,204],['mediumvioletred',199,21,133],['midnightblue',25,25,112],['mintcream',245,255,250],['mistyrose',255,228,225],['moccasin',255,228,181],['navajowhite',255,222,173],['navy',0,0,128],['oldlace',253,245,230],['olive',128,128,0],['olivedrab',107,142,35],['orange',255,165,0],['orangered',255,69,0],['orchid',218,112,214],['palegoldenrod',238,232,170],['palegreen',152,251,152],['paleturquoise',175,238,238],['palevioletred',219,112,147],['papayawhip',255,239,213],['peachpuff',255,218,185],['peru',205,133,63],['pink',255,192,203],['plum',221,160,221],['powderblue',176,224,230],['purple',128,0,128],['red',255,0,0],['rosybrown',188,143,143],['royalblue',65,105,225],['saddlebrown',139,69,19],['salmon',250,128,114],['sandybrown',244,164,96],['seagreen',46,139,87],['seashell',255,245,238],['sienna',160,82,45],['silver',192,192,192],['skyblue',135,206,235],['slateblue',106,90,205],['slategray',112,128,144],['slategrey',112,128,144],['snow',255,250,250],['springgreen',0,255,127],['steelblue',70,130,180],['tan',210,180,140],['teal',0,128,128],['thistle',216,191,216],['tomato',255,99,71],['turquoise',64,224,208],['violet',238,130,238],['wheat',245,222,179],['white',255,255,255],['whitesmoke',245,245,245],['yellow',255,255,0],['yellowgreen',154,205,50]];
	
	
	
	//__________________________________________________________________
	// Change the current state to match a string representing
	// a colour in any standard web colour format
	this.set = function(col)
	{
		// Convert input to string, shift to lower case and remove white-space
		var c = new String(col);
		c = c.toLowerCase();
		c = c.replace(/\s/g,'');
		
		// Declare an array to hold the return values from parsing the input
		colarray = new Array();
		
		// Decide what format the input is in an pass to the appropriate function
		if( (c.indexOf('#') == 0) && (c.length == 4) )	{colarray = getShortHex(c);}	//short hex
		else if( (c.indexOf('#') == 0) && (c.length == 7) )	{colarray = getHex(c);}		//hex
		else if(c.indexOf('rgb(') == 0)		{colarray = getRgb(c);}							//rgb
		else if(c.indexOf('rgba(') == 0)	{colarray = getRgba(c);}						//rgba
		else if(c.indexOf('hsl(') == 0)		{colarray = getHsl(c);}							//hsl
		else if(c.indexOf('hsla(') == 0)	{colarray = getHsla(c);}						//hsla
		else 								{colarray = getName(c);}						//keyword
		
		// Determine whether input was parsed successfully
		if( (colarray[0] == -1) || (colarray[1] == -1) || (colarray[2] == -1) || (colarray[3] == -1) ) this.valid = false;
		else this.valid = true;
		
		// Update class' state valiables
		this.r = colarray[0];
		this.g = colarray[1];
		this.b = colarray[2];
		this.a = colarray[3];
		
		return this.valid;
	}
	
	
	//__________________________________________________________________
	// Compare the current state with a string representing
	// a colour in any standard web colour format
	this.compare = function(col2)
	{
		// Convert input to string, shift to lower case and remove white-space
		var c = new String(col2);
		c = c.toLowerCase();
		c = c.replace(/\s/g,'');
		
		// Declare an array to hold the return values from parsing the input
		colarray = new Array();
		
		// Decide what format the input is in an pass to the appropriate function
		if( (c.indexOf('#') == 0) && (c.length == 4) )	{colarray = getShortHex(c);}	//short hex
		else if( (c.indexOf('#') == 0) && (c.length == 7) )	{colarray = getHex(c);}		//hex
		else if(c.indexOf('rgb(') == 0)		{colarray = getRgb(c);}							//rgb
		else if(c.indexOf('rgba(') == 0)	{colarray = getRgba(c);}						//rgba
		else if(c.indexOf('hsl(') == 0)		{colarray = getHsl(c);}							//hsl
		else if(c.indexOf('hsla(') == 0)	{colarray = getHsla(c);}						//hsla
		else 								{colarray = getName(c);}						//keyword
		
		if( (colarray[0] == this.r) && (colarray[1] == this.g) && (colarray[2] == this.b) && (colarray[3] == this.a) ) return true;
		else return false;
	}
	
	
	
	/* *****************************************************************
	 * Methods to return the current colour state
	 */
	
	
	
	//__________________________________________________________________
	// rgb
	this.rgb = function()
	{
		var c = 'rgb(';
		c += this.r.toString();
		c += ',';
		c += this.g.toString();
		c += ',';
		c += this.b.toString();
		c += ')';
		return c;
	}
	
	
	//__________________________________________________________________
	// rgba
	this.rgba = function()
	{
		var c = 'rgba(';
		c += this.r.toString();
		c += ',';
		c += this.g.toString();
		c += ',';
		c += this.b.toString();
		c += ',';
		c += this.a.toString();
		c += ')';
		return c;
	}
	
	
	//__________________________________________________________________
	// hsl
	this.hsl = function()
	{
		var red = this.r / 255.0;
		var green = this.g / 255.0;
		var blue = this.b / 255.0;
		
		var M = Math.max(red, green, blue);
		var m = Math.min(red, green, blue);
		var C = M - m;
		
		var h;
		if(C == 0)		h = 0;
		else if(M == red)	h = ((green - blue)/C) % 6;
		else if(M == green)	h = ((blue - red)/C) + 2;
		else if(M == blue)	h = ((red - green)/C) + 4;
		h *= 60.0;
		
		var l = (M + m)/2.0;
		
		var s;
		if(C == 0)			s = 0.0;
		else if(l <= 0.5)	s = C / (2.0*l);
		else if(l > 0.5)	s = C / (2.0 - (2.0*l));
		
		l *= 100.0;
		l = parseInt(l.toFixed());
		s *= 100.0;
		s = parseInt(s.toFixed());
		
		return "hsl(" + h + "," + s + "%," + l + "%)";
	}
	
	
	//__________________________________________________________________
	// hsla
	this.hsla = function()
	{
		var red = this.r / 255.0;
		var green = this.g / 255.0;
		var blue = this.b / 255.0;
		
		var M = Math.max(red, green, blue);
		var m = Math.min(red, green, blue);
		var C = M - m;
		
		var h;
		if(C == 0)		h = 0;
		else if(M == red)	h = ((green - blue)/C) % 6;
		else if(M == green)	h = ((blue - red)/C) + 2;
		else if(M == blue)	h = ((red - green)/C) + 4;
		h *= 60.0;
		
		var l = (M + m)/2.0;
		
		var s;
		if(C == 0)			s = 0.0;
		else if(l <= 0.5)	s = C / (2.0*l);
		else if(l > 0.5)	s = C / (2.0 - (2.0*l));
		
		l *= 100.0;
		l = parseInt(l.toFixed());
		s *= 100.0;
		s = parseInt(s.toFixed());
		
		return "hsla(" + h + "," + s + "%," + l + "%," + this.a + ")";
	}
	
	
	//__________________________________________________________________
	// hex
	this.hex = function()
	{
		var c = '#';
		c += dec2hex(this.r);
		c += dec2hex(this.g);
		c += dec2hex(this.b);
		return c;
	}
	
	
	//__________________________________________________________________
	// name
	this.name = function()
	{
		if( (this.r == 0) && (this.g == 0) && (this.b == 0) && (this.a == 0.0) ) return 'transparent';
		
		for(var i = 0; i != keywords.length; ++i)
		{
			if( (keywords[i][1] == this.r) && (keywords[i][2] == this.g) && (keywords[i][3] == this.b) )
			{
				return keywords[i][0];
			}
		}
		
		return 'unknown';
	}
	
	
	
	/* *****************************************************************
	 * Methods for parsing strings into rgba
	 */

	
	
	//__________________________________________________________________
	// name
	function getName(c)
	{
		if(c == 'transparent') return [0,0,0,0.0];
		
		for(var i = 0; i != keywords.length; ++i)
		{
			if(keywords[i][0] == c)
			{
				return [keywords[i][1], keywords[i][2], keywords[i][3], 1.0];
			}
		}
		
		return [-1,-1,-1,-1];
	}
	
	
	//__________________________________________________________________
	// hex
	function getHex(c)
	{
		var red = c.substring(1,3);
		var green = c.substring(3,5);
		var blue = c.substring(5,7);
		
		red = hex2dec(red);
		green = hex2dec(green);
		blue = hex2dec(blue);
		
		if(red > 255) red = 255;
		if(green > 255) green = 255;
		if(blue > 255) blue = 255;
		
		return [red, green, blue, 1.0];
	}
	
	
	//__________________________________________________________________
	// short hex	
	function getShortHex(c)
	{
		var red = c.charAt(1);
		var green = c.charAt(2);
		var blue = c.charAt(3);
		
		red += red;
		green += green;
		blue += blue;
		
		red = hex2dec(red);
		green = hex2dec(green);
		blue = hex2dec(blue);
		
		if(red > 255) red = 255;
		if(green > 255) green = 255;
		if(blue > 255) blue = 255;
		
		return [red, green, blue, 1.0];
	}
	
	
	//__________________________________________________________________
	// rgb
	function getRgb(c)
	{
		c = c.substr(4,(c.length - 1));
		var c2 = c.split(',');
		
		var red;
		var green;
		var blue;
		
		if(c2[0].indexOf('%') == -1)
		{
			red = parseInt(c2[0]);
		}
		else
		{
			c2[0].replace('%','');
			red = parseInt(c2[0]);
			red = 255. * (red/100.);
			red = parseInt(red.toFixed());
		}
		if(red > 255) red = 255;
		
		if(c2[1].indexOf('%') == -1)
		{
			green = parseInt(c2[1]);
		}
		else
		{
			c2[1].replace('%','');
			green = parseInt(c2[1]);
			green = 255. * (green/100.);
			green = parseInt(green.toFixed());
		}
		if(green > 255) green = 255;
		
		if(c2[2].indexOf('%') == -1)
		{
			blue = parseInt(c2[2]);
		}
		else
		{
			c2[2].replace('%','');
			blue = parseInt(c2[2]);
			blue = 255 * (blue/100.);
			blue = parseInt(blue.toFixed());
		}
		if(blue > 255) blue = 255;
		
		return [red,green,blue,1.0];
	}
	
	
	//__________________________________________________________________
	// rgba
	function getRgba(c)
	{
		c = c.substr(5,(c.length - 1));
		var c2 = c.split(',');
		
		var red;
		var green;
		var blue;
		var alpha;
		
		if(c2[0].indexOf('%') == -1)
		{
			red = parseInt(c2[0]);
		}
		else
		{
			c2[0].replace('%','');
			red = parseInt(c2[0]);
			red = 255. * (red/100.);
			red = parseInt(red.toFixed());
		}
		if(red > 255) red = 255;
		
		if(c2[1].indexOf('%') == -1)
		{
			green = parseInt(c2[1]);
		}
		else
		{
			c2[1].replace('%','');
			green = parseInt(c2[1]);
			green = 255. * (green/100.);
			green = parseInt(green.toFixed());
		}
		if(green > 255) green = 255;
		
		if(c2[2].indexOf('%') == -1)
		{
			blue = parseInt(c2[2]);
		}
		else
		{
			c2[2].replace('%','');
			blue = parseInt(c2[2]);
			blue = 255 * (blue/100.);
			blue = parseInt(blue.toFixed());
		}
		if(blue > 255) blue = 255;
		
		alpha = parseFloat(c2[3]);
		
		return [red,green,blue,alpha];
	}
	
	
	//__________________________________________________________________
	// hsl
	function getHsl(c)
	{
		// Define a sub-function used three times within getHsl
		function hue2rgb(m1,m2,h)
		{
			if(h < 0.0) h += 1.0;
			if(h > 1.0) h -= 1.0;
			
			if( (h*6.0) < 1.0 ) return ( m1 + ((m2-m1)*h*6) );
			if( (h*2.0) < 1.0 ) return m2;
			if( (h*3.0) < 2.0 ) return ( m1 + ( (m2-m1) * ((2.0/3.0)-h) * 6.0) );
			
			return parseFloat(m1);
		}
		
		// Get an array of the hsl values
		c = c.substr(4,(c.length - 1));
		var c2 = c.split(',');
		
		// Retrieve hsl values
		var h = parseInt(c2[0]);
		h /= 360.;
		
		c2[1].replace('%','');
		var s = parseInt(c2[1]);
		s /= 100.0;
		
		c2[2].replace('%','');
		var l = parseInt(c2[2]);
		l /= 100.0;
		
		// calculate
		var m2;
		if( l <= 0.5 ) m2 = l*(s+1);
		else m2 = l + s - (l*s);
		
		var m1 = l*2 - m2;
		
		var red = hue2rgb(m1, m2, (h+(1.0/3.0)));
		var green = hue2rgb(m1, m2, h);
		var blue = hue2rgb(m1, m2, (h-(1.0/3.0)));
		
		red *= 255.0;
		green *= 255.0;
		blue *= 255.0;
		
		red = parseInt(red.toFixed());
		green = parseInt(green.toFixed());
		blue = parseInt(blue.toFixed());
		
		if(red > 255) red = 255;
		if(green > 255) green = 255;
		if(blue > 255) blue = 255;
		
		return [red, green, blue, 1.0];
	}
	
	
	//__________________________________________________________________
	// hsla
	function getHsla(c)
	{
		// Define a sub-function used three times within getHsl
		function hue2rgb(m1,m2,h)
		{
			if(h < 0.0) h += 1.0;
			if(h > 1.0) h -= 1.0;
			
			if( (h*6.0) < 1.0 ) return ( m1 + ((m2-m1)*h*6) );
			if( (h*2.0) < 1.0 ) return m2;
			if( (h*3.0) < 2.0 ) return ( m1 + ( (m2-m1) * ((2.0/3.0)-h) * 6.0) );
			
			return parseFloat(m1);
		}
		
		c = c.substr(5,(c.length - 1));
		var c2 = c.split(',');
		
		// Retrieve hsl values
		var h = parseInt(c2[0]);
		h /= 360.;
		
		c2[1].replace('%','');
		var s = parseInt(c2[1]);
		s /= 100.0;
		
		c2[2].replace('%','');
		var l = parseInt(c2[2]);
		l /= 100.0;
		
		var alpha = parseFloat(c2[3]);
		
		// calculate
		var m2;
		if( l <= 0.5 ) m2 = l*(s+1);
		else m2 = l + s - (l*s);
		
		var m1 = l*2 - m2;
		
		var red = hue2rgb(m1, m2, (h+(1.0/3.0)));
		var green = hue2rgb(m1, m2, h);
		var blue = hue2rgb(m1, m2, (h-(1.0/3.0)));
		
		red *= 255.0;
		green *= 255.0;
		blue *= 255.0;
		
		red = parseInt(red.toFixed());
		green = parseInt(green.toFixed());
		blue = parseInt(blue.toFixed());
		
		if(red > 255) red = 255;
		if(green > 255) green = 255;
		if(blue > 255) blue = 255;
		
		return [red,green,blue,alpha];
	}
	
	
	
	/* *****************************************************************
	 * Miscellaneous methods
	 */
	
	
	
	//__________________________________________________________________
	// Returns whether the class thinks it has a valid colour or not.
	// This is not conclusive: false guarantees colour is invalid,
	// but true does not guarantee a valid colour.
	this.isValid = function()
	{
		return this.valid;
	}
	
	
	//__________________________________________________________________
	// Convert decimal number to 2 digit hexadecimal string
	function dec2hex(d)
	{
		var h = d.toString(16);
		if(h.length == 1) h = 0 + h;
		return h;
	}
	
	
	//__________________________________________________________________
	// Convert hexadecimal string to decimal number
	function hex2dec(h)
	{
		return parseInt(h,16);
	}
	
	
	
	//__________________________________________________________________
	// When class is constructed, read in argument and default to
	// transparent
	if( typeof(col) == "undefined" )
	{
		this.set("rgba(0,0,0,0.0)");
	}
	else
	{
		this.set(col);
	}
}
