/* 
 * orbit.js: Class representing an orbit
 */
/**
 * Class representing an orbit
 */
import Plotly from 'plotly'
import { call as potcall, rectforce } from '../potential/potential'
import { leapfrog } from '../util/ode'
import { default as array } from '../util/array'
import { default as coords } from '../util/coords'

/**
 * Class that represents an orbit
 */
class Orbit {
    /**
     * Set up an Orbit instance
     * @param {number=} vxvv - initial conditions [R,vR,vT,z,vz,phi]
     * @param {number=} ro - internal length unit
     * @param {number=} vo - internal velocity unit
     */
    constructor(vxvv,ro=8.,vo=220.) {
	this._vxvv= vxvv;
	this._ro= ro;
	this._vo= vo;
    }

    /**
     * Integrate the orbit
     * @param {Array} t - time to integrate for as [tstart,tend,nt]
     * @param {Object} pot - Potential instance of list thereof
     * @return {number} Value of the potential
     */
    integrate(t,pot,rtol=1.49012e-12,atol=1.49012e-12) {
	this._t= array.linspace(...t);
	this._pot= pot;
	let yo=array.array.from(coords.cyl_to_rect_galpy(...this._vxvv));
	let orbit_rect= leapfrog((xyz,t) => rectforce(pot,
				Math.sqrt(xyz[0]*xyz[0]+xyz[1]*xyz[1]),
				xyz[2],
				Math.atan2(xyz[1],xyz[0]),
				t),
				 yo,
				 t,
				 rtol,atol);
	this._orbit= coords.rect_to_cyl_galpy(
	    array.array.from(orbit_rect[0]),
	    array.array.from(orbit_rect[1]),
	    array.array.from(orbit_rect[2]),
	    array.array.from(orbit_rect[3]),
	    array.array.from(orbit_rect[4]),
	    array.array.from(orbit_rect[5]));
	this._R= array.array.from(this._orbit[0]);
	this._vR= array.array.from(this._orbit[1]);
	this._vT= array.array.from(this._orbit[2]);
	this._z= array.array.from(this._orbit[3]);
	this._vz= array.array.from(this._orbit[4]);
	this._phi= array.array.from(this._orbit[5]);
	return this;
    }

    /**
     * Calculate the energy along an orbit
     * @param {boolean=} full - if true, return energy at each time step, otherwise at the initial condition (default=False)
     * @return {number|Array} Value of the energy
     */
    E (full=false) {
	if ( full ) {
	    let out= array.array.from(this._R.map(
		(v,idx) => potcall(this._pot,v,this._z[idx],
				   this._phi[idx],this._t[idx])));
	    return out.add(this._vR.mult(this._vR)
			   .add(this._vT.mult(this._vT))
			   .add(this._vz.mult(this._vz))
			   .mult(0.5));
	} else {
	    return potcall(this._pot,this._vxvv[0],this._vxvv[3],
			this._vxvv[5])
		+0.5*(this._vxvv[1]*this._vxvv[1]
		      +this._vxvv[2]*this._vxvv[2]
		      +this._vxvv[4]*this._vxvv[4]);
	}
    }

    /*
     * Plotting functions
     */
    _parse_plot_quantity (d1) {
	let out;
	let out_label;
	switch ( d1 ) {
	case 't':
	    out= this._t;
	    out_label= '$t$'
	    break;
	case 'R':
	    out= this._R;
	    out_label= '$R$';
	    break;
	case 'z':
	    out= this._z;
	    out_label= '$z$';
	    break;
	case 'Enorm':
	    out= this.E(true);
	    out= out.mult(1./out.mean());
	    out_label= '$E/\langle E \rangle$';
	    break;
	}
	return [out,out_label];
    }
    
    /**
     * Plot the orbit in the browser
     * @param {string} graphDiv - DOM node or string id of a DOM node
     * @param {object} options - object with option keys
     *                  'd1': ('R') quantity to plot on the x axis
     *                  'd2': ('z') quantity to plot on the y axis
     *                  'overplot': (false) if true, add overplot on the current plot at graphDiv (in this case, you can also pass graphDiv as null or an empty string)
     */
    plot (graphDiv,
	  options) {
	if ( typeof window === 'undefined' )
	    throw new Error('Plotting a galpy.js orbit only works in the browser, not in node');
	if ( typeof Plotly === 'undefined' )
	    throw new Error('To plot an orbit, please load Plotly');
	let default_options= {
	    'd1': 'R',
	    'd2': 'z',
	    'overplot': false,
	};
	options= {...default_options,...options};
	let [x,xlabel]= this._parse_plot_quantity(options['d1']);
	let [y,ylabel]= this._parse_plot_quantity(options['d2']);
	let layout= {
	    xaxis: {title: {
                      text: xlabel,
                      font: {size: 17.,},
                      standoff: 0.,
	            },
		    autorange: true,
		    showgrid: false,
		    zeroline: false,
		    showline: true,
		    mirror: 'ticks',
		    ticks: 'inside',
		    ticklen: 8,
		    linewidth: 2,},
	    yaxis: {title: {
		      text: ylabel,
                      font: {size: 17.,},
                      standoff: 0.,
	            },
		    autorange: true,
		    showgrid: false,
		    zeroline: false,
		    showline: true,
		    mirror: 'ticks',
		    ticks: 'inside',
		    ticklen: 8,
		    linewidth: 2,
		    font: {size: 17.,},},
	    showlegend: false,
	    margin: {t: 20,
		     b: 40,},
	};
	let plotFunc;
	if ( options['overplot'] ) {
	    if ( !graphDiv )
		graphDiv= window._galpy_plot_current_graphDiv;
	    plotFunc= Plotly.plot;
	}
	else {
	    plotFunc= Plotly.newPlot;
	}
	plotFunc(graphDiv,
		 [{x: x,
		   y: y,
		   mode: 'lines',
		   line: {
		       shape: 'spline'
		   },
		  }],
		 layout,
		 {staticPlot: true});
	window._galpy_plot_current_graphDiv= graphDiv;
    }

}

export {
    Orbit
}
