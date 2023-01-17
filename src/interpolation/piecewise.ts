/**
 * @author Den Kravchu <denkravchu@gmail.com>
 * @fileoverview Piecewise function for itl 2022
 * @version 0.2.0.beta
**/
import { IInterpolationTimeline, IInterpolationInterface } from "../interfaces/interpolation.interface"

const piecewise = (key: string, times: number[], tInterface: IInterpolationInterface, timeline: IInterpolationTimeline, time: number) => {
    if ( times.length === 1 ) {
        // @ts-expect-error
        return tInterface[key] = { ...timeline.filter(_ => _.$TIME === times[0])[0][key], $TIME: tInterface[key].$TIME  }
    }
    const tA = times[0]
    const tB = times[1]
    const pA = timeline.filter(_ => _.$TIME === tA)[0][key]
    const pB = timeline.filter(_ => _.$TIME === tB)[0][key]
    if ( pA === undefined || pB === undefined ) { 
        console.error(`[ITL]: invalid $TIME in Interface "${key}, ${tA}, ${tB}"`) 
        return
    }
    const t = Math.max(Math.min(time, tB), tA)
    Object.keys(tInterface[key]).forEach((innerKey: number | string) => {
        if ( key === '$TIME' || innerKey === '$TIME' ) { return }
        // @ts-expect-error
        tInterface[key][innerKey] = (t - tA) / (tB - tA) * (pB[innerKey] - pA[innerKey]) + pA[innerKey]
    })
}

export { piecewise }