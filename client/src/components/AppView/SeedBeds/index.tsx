import React from "react";
import SeedBed from "../SeedBed";
import { IPosition, ISeedBed } from "../../../helpers/types";

const seedBeds: React.FunctionComponent<{ beds: ISeedBed[], mouseDesignPanelPosition: IPosition }> = ({ beds, mouseDesignPanelPosition }) => {
    return (
        <React.Fragment>
            {beds.map((seedBed, i) => {
                let position: IPosition = { x: seedBed.x, y: seedBed.y };
                if (!seedBed.isPlaced) {
                    position = { x: mouseDesignPanelPosition.x - seedBed.width / 2, y: mouseDesignPanelPosition.y - seedBed.height / 2 };
                }
                return <SeedBed key={"seed-bed-" + i} {...seedBed} {...position} />
            })}
        </ React.Fragment>
    )
}

export default React.memo(seedBeds);