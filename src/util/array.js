/* 
 * array.js: Class and routines to deal with numerical arrays
 */
/**
 * Class representing an array with numerical methods
 */
class array extends Array {
    constructor(...args) {
	super(...args);
    }

    /**
     * Initialize an array
     * @return {Object}
     */
    init () {
	let _Array= JSON.parse(JSON.stringify(this));
	let dim= 1;
	let shape= [this.length];
	let this_this= this[0];
	if ( ! ( this_this ==  undefined ) ) {
	     while ( this_this[0] !== undefined ) {
		 dim= dim+1;
		 shape.push(this_this.length);
		 if ( this_this[0] == undefined ) // for empty
		     break;
		 this_this= this_this[0];
	     }
	}
	this._dim= dim;
	this._shape= shape;
	this._size= this._shape.reduce((r,v) => r*v);
	return this;
    }

    static from (...args) {
	return super.from(...args).init();
    }

    /**
     * Return array as a plain Array
     * @return {Object} Array representation of the array's data
     */
    asArray () {
	return Array.from(JSON.parse(JSON.stringify(this)));
    }
    
    /*
     * Basic arithmetic
     */
    /**
     * Add to the array
     * @param {number|Object} arr - number or array to add (number gets broadcast)
     * @return {Object} new array holding the sum
     */
    add (arr) {
	if ( typeof arr === 'number' )
	    return array.from(this.map(x => x+arr));
	else if ( arr.length === this.length )
	    return array.from(this.map((x,idx) => x+arr[idx]));
    }

    /**
     * Multiply an array
     * @param {number|Object} arr - number or array to multiply the present array with (number gets broadcast)
     * @return {Object} new array holding the product
     */
    mult (arr) {
	if ( typeof arr === 'number' )
	    return array.from(this.map(x => x*arr));
	else if ( arr.length === this.length )
	    return array.from(this.map((x,idx) => x*arr[idx]));
    }

    /*
     * Math functions operating on array
     */
    /**
     * Element-wise cosine of an array
     * @return {Object} new array holding the cosine
     */
    cos () {
	return array.from(this.map(x => Math.cos(x)));
    }

    /**
     * Element-wise inverse of an array
     * @return {Object} new array holding the inverse
     */
    inv (arr) {
	return array.from(this.map(x => 1./x));
    }   
    
    /**
     * Element-wise sine of an array
     * @return {Object} new array holding the sine
     */
    sin () {
	return array.from(this.map(x => Math.sin(x)));
    }	

    /*
     * Reductions
     */
    /**
     * Maximum of an array
     * @return {number} maximum value of the array
     */
    amax () {
	return this.reduce((a,b) => Math.max(a,b));
    }

    /**
     * Minimum of an array
     * @return {number} minimum value of the array
     */
    amin () {
	return this.reduce((a,b) => Math.min(a,b));
    }
   
    /**
     * Mean of an array
     * @return {number} mean value of the array
     */
    mean () {
	return this.reduce((r,v) => r+v,0)/this.length;
    }

    /**
     * Standard deviation of an array
     * @return {number} standard deviation  of the array
     */
    std () {
	return Math.sqrt(this.add(-this.mean())
			 .reduce((r,v) => r+v*v,0)/this.length);
    }
}

/*
 * array initialization functions
 */
/*
 * First a factory function to generate different types of outputs:
 *  a) constant value val or b) null
 */
function _initval (val,shape=50) {
   if ( ! ( shape instanceof Array ) )
       shape= [shape];
    let inner;
    if ( ! ( val === undefined ) )
	inner= Array(shape[shape.length-1]).fill(val);
    else
	inner= Array(shape[shape.length-1]);
    let outer= inner;
    for ( let ii= shape.length-2; ii >= 0; ii-- ){
	outer= [];
	for ( let jj= 0; jj < shape[ii]; jj++ ) {
	    outer.push(JSON.parse(JSON.stringify(inner)));
	}
	inner= JSON.parse(JSON.stringify(outer));
    }
    return array.from(outer);
}
/**
 * Initialize an array of zeros
 * @param {number|Array=} shape - shape of entries
 * @return {Object} array of zeros with shape shape
 */
function zeros (shape=50) {
    return _initval(0.,shape);
}

/**
 * Initialize an array of ones
 * @param {number|Array=} shape - shape of entries
 * @return {Object} array of zeros with shape shape
 */
function ones (shape=50) {
    return _initval(1.,shape);
}

/**
 * Initialize an empty array of a certain shape
 * @param {number|Array=} shape - shape of array
 * @return {Object} empty array with shape shape
 */
function empty (shape=50) {
    return _initval(undefined,shape);
}

/**
 * Initialize a array with linearly-spaced entries between start and stop
 * @param {number} start - starting value
 * @param {number} stop - last value
 * @param {number=} num - number of entries
 * @return {Object} array with linearly-spaced entries between start and stop
 */
function linspace (start,stop,num=50) {
    return array.from(Array.apply(null, {length: num})
		      .map(Number.call,Number)
		      .map(x => start+x*(stop-start)/(num-1.)));
}

/**
 * Initialize a array with geometrically-spaced entries between start and stop
 * @param {number} start - starting value
 * @param {number} stop - last value
 * @param {number=} num - number of entries
 * @return {Object} array with geometrically-spaced entries between start and stop
 */
function geomspace(start,stop,num=50) {
    let log10_start= Math.log10(start);
    let log10_stop= Math.log10(stop);
    return array.from(linspace(log10_start,log10_stop,num)
		      .map(x => Math.pow(10.,x)));
}

export default {
    array: array,
    empty: empty,
    zeros: zeros,
    ones: ones,
    linspace: linspace,
    geomspace: geomspace
}
