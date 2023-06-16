import Button from '@mui/material/Button'; 

export const Registration = ({value, test}) => {
    return ( 
        <div>
            <Button onClick={test} variant='contained'>Registration {value}</Button>
        </div>
    )
} 