import React, { useState } from 'react';
import {
    SpeedDial,
    SpeedDialIcon,
    SpeedDialAction,
} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SupportIcon from '@mui/icons-material/Support';

const SpeedDialComponent: React.FC = () => {
    const [open, setOpen] = useState(false);

    const actions = [
        { icon: <SupportIcon fontSize="large"/>, name: 'Get help' },
        { icon: <QuestionMarkIcon fontSize="large"/>, name: 'FAQ' },
    ];

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAction = (actionName: string) => {
        // Обработка действий SpeedDial
        // Добавьте свой код обработки действий здесь
        console.log(`Выполнено действие: ${actionName}`);
        setOpen(false);
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial example"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            FabProps={{
                color: "error",
            }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleClick}
            open={open}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => handleAction(action.name)}
                />
            ))}
        </SpeedDial>
    );
};

export default SpeedDialComponent;
