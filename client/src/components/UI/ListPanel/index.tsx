/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { stringifyIfDateLong } from "../../../helpers/functions";

interface IListPanelProps {
    header: Array<{ name: string, itemAttributeName: string }>
    items: Array<any>
}
const ListPanel: React.FC<IListPanelProps> = ({ header, items }) => {
    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            flex-grow: 1;
        `}>
            <table css={css`
            `}>
                <thead>
                    <tr>
                        {header.map(((headerItem, i) => {
                            return (
                                <th key={"th-" + i}>{headerItem.name}</th>
                            )
                        }))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => {
                        return (
                            <tr key={"tr-" + i}>
                                {header.map(((headerItem, hi) => {
                                    let otherProps: any = {};
                                    if (item["onClick"]) {
                                        otherProps.onClick = item["onClick"].bind(this, item, i);
                                    }
                                    let attrName = headerItem.itemAttributeName;
                                    let val = item[attrName];
                                    if((attrName as string).endsWith("DataTime")){
                                        attrName = attrName.substring(0, attrName.indexOf("DataTime"));
                                        val = new Date(item[attrName])
                                    }
                                    
                                    return (
                                        <td  key={"td-" + i + "-" + hi} {...otherProps} css={css`                                            
                                            text-align: center;
                                            cursor: pointer;
                                        `}>{stringifyIfDateLong(val)}</td>
                                    )
                                }))}

                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}


export default ListPanel;