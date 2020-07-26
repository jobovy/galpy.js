import { Potential, call, Rforce, zforce, phiforce,
	 xforce, yforce, rectforce } from './potential'
import { MiyamotoNagaiPotential } from './miyamotonagai'
import { IsochronePotential } from './isochrone'

export default {
    call: call,
    Rforce: Rforce,
    zforce: zforce,
    phiforce: phiforce,
    xforce: xforce,
    yforce: yforce,
    rectforce: rectforce,
    Potential: Potential,
    MiyamotoNagaiPotential: MiyamotoNagaiPotential,
    IsochronePotential: IsochronePotential
}
