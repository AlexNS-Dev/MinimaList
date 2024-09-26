import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTooltip =
    styled(
        ({ className, ...props }: TooltipProps) => (
            <Tooltip {...props} classes={{ popper: className }} />
        )
    )(
        () => ({
            [`& .${tooltipClasses.tooltip}`]: {
                backgroundColor: `color-mix(in srgb, var(--background-color) 50%, transparent 50%)`,
                border: `1px solid var(--text-color)`,
                backdropFilter: 'blur(5px)',
                color: 'var(--text-color)',
                fontFamily: 'inherit',
            },
        })
    );

export default CustomTooltip;