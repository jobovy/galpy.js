import { Potential, call, Rforce, zforce, phiforce } from './potential'
import { MiyamotoNagaiPotential } from './miyamotonagai'
import { IsochronePotential } from './isochrone'

export default {
    call: call,
    Rforce: Rforce,
    zforce: zforce,
    phiforce: phiforce,
    Potential: Potential,
    MiyamotoNagaiPotential: MiyamotoNagaiPotential,
    IsochronePotential: IsochronePotential
}
