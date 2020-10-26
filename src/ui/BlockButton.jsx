
import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

const BlockButton = (props) => {
    return (
        <div style={{ position: "relative", ...props.style }}>
            <Button
                {...(props.loading ? { disabled: true } : {})}
                style={props.style}
                color={props.color ? props.color : "primary"}
                variant="contained"
                type="submit"
                onClick={props.onClick}
            >
                <span className="pl-2 capitalize">{props.text}</span>
            </Button>
            {props.loading ? (
                <CircularProgress
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: -12,
                        marginLeft: -12,
                    }}
                    size={24}
                    color="secondary"
                />
            ) : null}
        </div>
    );
};

export default BlockButton;