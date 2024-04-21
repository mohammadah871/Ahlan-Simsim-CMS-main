import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import jwtService from '../../auth/services/jwtService';
import Popup from './Popup';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { apiBaseUrl } from 'src/constants/config';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
    email: '',
    password: '',
    remember: true,
};

function SignInPage() {
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [open, setOpen] = useState("");
    const [popupContent, setPopupContent] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [id, setId] = useState("");
    const [disabled, setDisabled] = useState(true);

    function onSubmit(e) {


        if (disabled === false) {

            setOpen(true);

            axios.post(apiBaseUrl + "/graphql",
                {
                    "query": "mutation request($data: UserAppDesktopInput) { UpdatePasswordUser(userAppDesktopInput:$data)}",
                    "variables": {
                        "data": {
                            "id": id,
                            "password": password
                        }
                    }
                }).then((res) => {
                    setTimeout(() => {
                        setPopupContent("Password updated");

                        setTimeout(() => {
                            window.location.href = "https://cms.ircascms.com";
                        }, 6000);
                    }, 3000);



                });
        }


        e.preventDefault();


    }
    useEffect(() => {
        let disabledval = false;

        if (password.length < 6 || passwordConfirm.length < 6) {
            disabledval = true;
        }

        if (password !== passwordConfirm) {
            disabledval = true;
        }

        setDisabled(disabledval);
    }, [password, passwordConfirm]);
    useEffect(() => {

        setPopupContent(<CircularProgress />);
        setOpen(true);

        const queryString = window.location.search;

        const urlParams = new URLSearchParams(queryString);

        let code = urlParams.get('code');

        axios.post(apiBaseUrl + "/graphql",
            {
                // query: "mutation request($data: SettingsInput) { UpdateSettings(settingsInput: $data) }",
                query: "query request($code: String!) { CheckPasswordDesktop(code: $code) { _id,id }}",
                variables: {
                    code: code
                }

            }
        ).then((res) => {

            if (res.data.data.CheckPasswordDesktop._id !== "") {
                setOpen(false);
                setId(res.data.data.CheckPasswordDesktop.id)
            }

        })


        // setTimeout(() => {
        //     setOpen(false);

        // }, 3000);
    }, [])

    return (
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
            <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
                <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                    <div className='center-full'>
                        <img className="w-200-logo" src="assets/images/logo/logo.svg" alt="logo" />
                    </div>
                    <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
                        Reset password
                    </Typography>


                    <form
                        name="loginForm"
                        noValidate
                        className="flex flex-col justify-center w-full mt-32"
                        onSubmit={onSubmit}
                    >
                        <TextField
                            className="mb-24"
                            label="Password"
                            autoFocus
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <TextField
                            className="mb-24"
                            label="Confirm password"
                            autoFocus
                            type="password"
                            variant="outlined"
                            required
                            fullWidth

                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}

                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ color: '#ffffff' }}
                            className=" w-full mt-16"
                            aria-label="Sign in"
                            disabled={disabled}
                            type="submit"
                            size="large"
                        >
                            Reset
                        </Button>
                    </form>
                </div>
            </Paper>

            <Box
                className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
                sx={{ backgroundColor: 'primary.main' }}
            >
                <svg
                    className="absolute inset-0 pointer-events-none"
                    viewBox="0 0 960 540"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMax slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <Box
                        component="g"
                        sx={{ color: 'primary.light' }}
                        className="opacity-20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="100"
                    >
                        <circle r="234" cx="196" cy="23" />
                        <circle r="234" cx="790" cy="491" />
                    </Box>
                </svg>
                <Box
                    component="svg"
                    className="absolute -top-64 -right-64 opacity-20"
                    sx={{ color: 'primary.light' }}
                    viewBox="0 0 220 192"
                    width="220px"
                    height="192px"
                    fill="none"
                >
                    <defs>
                        <pattern
                            id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                </Box>

                <div className="z-10 relative w-full max-w-2xl">
                    <div className="text-7xl font-bold leading-none text-gray-100">
                        {/* <div>Welcome to</div> */}
                        <div className='login-title'>Ahlan Simsim</div>
                    </div>
                </div>
            </Box>
            <Popup open={open} content={popupContent} title={""} />
        </div>
    );
}

export default SignInPage;
