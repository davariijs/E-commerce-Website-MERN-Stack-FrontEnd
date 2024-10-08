import React, { useEffect} from "react";
import { Range, getTrackBackground } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterPrices } from "../../redux/filterProducts/filterProductsSlice";
import { setValuesFilter } from "../../redux/filterProducts/filterProductsSlice";

export default function RangeBar () {
    const dispatch = useDispatch();
    const values = useSelector (selectFilterPrices);

    useEffect(() => {
        if (values === undefined) {
                dispatch(setValuesFilter([19,200]))
              } else{
                dispatch(setValuesFilter(values))
              }
      }, [dispatch,values]);

    const STEP = 1;
    const MIN = 0;
    const MAX = 300;

    return(
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
        }}
        >
        <Range
            values={values}
            step={STEP}
            min={MIN}
            max={MAX}
            
            onChange={(values) => {
                dispatch(setValuesFilter(values))
            }}
            renderTrack={({ props, children }) => (
            <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
                }}
            >
                <div
                ref={props.ref}
                style={{
                    height: "3px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                    values,
                    colors: ["#ccc", "#8A33FD", "#ccc"],
                    min: MIN,
                    max: MAX,
                    
                    }),
                    alignSelf: "center",
                }}
                >
                {children}
                </div>
            </div>
            )}
            renderThumb={({ props, isDragged }) => (
            <div
                {...props}
                key={props.key}
                style={{
                ...props.style,
                height: "16px",
                width: "16px",
                borderRadius: "50%",
                backgroundColor: "#8A33FD",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
                }}
            >
                <div
                style={{
                    height: "0px",
                    width: "0px",
                    backgroundColor: "#8A33FD",
                }}
                />
            </div>
            )}
        />
        <output style={{ marginTop: "25px" }} id="output">
        <div className="flex justify-between gap-6">
            <div className="text-darkText border-borderGrey border-2 py-2 px-8 rounded-md font-medium text-base">${values[0]}</div>
            <div className="text-darkText border-borderGrey border-2 py-2 px-8 rounded-md font-medium text-base">${values[1]}</div>
            </div>  
        </output>
        </div>
    )
}