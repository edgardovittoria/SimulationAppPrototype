import React, {useState} from 'react';

interface InputSignalProps {
    setShowModalSignal: Function
}

export const InputSignal: React.FC<InputSignalProps> = ({setShowModalSignal}) => {

    const [selectedSignal, setSelectedSignal] = useState("");

    return(
        <div className="mt-4 portPositionBox">
            <div className="row">
                <h6>Input Signal</h6>
                <div className="col-4">
                    <select className="w-100 selectSignal" placeholder="Select Signal" onChange={(event) => {
                        setSelectedSignal(event.currentTarget.value)
                    }}>
                        <option value="undefined">UNDEFINED</option>
                        <option value="Signal 1">Signal 1</option>
                        <option value="Signal 2">Signal 2</option>
                    </select>
                </div>
                <div className="col-4">
                    <button
                        onClick={() => setShowModalSignal(true)}
                        className="w-100 btnNewSignal"
                    >+New Signal
                    </button>
                </div>
                <div className="col-4">
                    <label className="loadSignal">
                        <input type="file"/>
                        Load Signal
                    </label>
                </div>
                {selectedSignal !== "undefined" &&
                <div className="mt-3">
                    <h6>Selected Signal:</h6>
                    <span>{selectedSignal}</span>
                </div>
                }

            </div>
        </div>
    )

}