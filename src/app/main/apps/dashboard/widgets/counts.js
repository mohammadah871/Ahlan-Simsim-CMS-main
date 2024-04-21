import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useState } from 'react';

function OverdueWidget(props) {
    const { title, setTitle } = useState("title");
    const [data, setData] = useState({
        name: "name",
        count: 0,
        extra: {
            name: "extra",
            count: 1
        }
    });

    return (
        <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center px-8 pt-12 min-h-[70px] text-center">
                <Typography
                    className="px-16 text-xl tracking-tight leading-6 truncate text-center font-medium"
                    color="text.secondary"
                >
                    {props.title}
                </Typography>
            </div>
            <div className="text-center mt-8">
                <Typography className={"text-7xl sm:text-8xl font-bold tracking-tight leading-none " + props.color}>
                    {props.count}
                </Typography>
                <Typography className="text-lg font-medium text-red-600">{props.name}</Typography>
            </div>
            <Typography
                className="flex items-baseline justify-center w-full mt-20 mb-24"
                color="text.secondary"
                style={{ opacity: 0, visibility: "hidden" }}
            >
                <span className="truncate">{data.extra.name}</span>:
                <b className="px-8">{data.extra.count}</b>
            </Typography>
        </Paper>
    );
}

export default memo(OverdueWidget);
