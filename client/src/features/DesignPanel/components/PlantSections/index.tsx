import React from "react";
import PlantSection from "../PlantSection";
import { IPosition } from "../../../../helpers/types";
import { IPlantSection } from "../../types";

const plantSections: React.FunctionComponent<{ sections: IPlantSection[], mouseDesignPanelPosition: IPosition }> = ({ sections: beds, mouseDesignPanelPosition }) => {
    return (
        <React.Fragment>
            {beds.map((plantSection, i) => {
                let position: IPosition = { x: plantSection.x, y: plantSection.y };
                if (!plantSection.isPlaced) {
                    position = { x: mouseDesignPanelPosition.x - plantSection.width / 2, y: mouseDesignPanelPosition.y - plantSection.height / 2 };
                }
                return <PlantSection key={"seed-bed-" + i} {...plantSection} {...position} />
            })}
        </ React.Fragment>
    )
}

export default React.memo(plantSections);