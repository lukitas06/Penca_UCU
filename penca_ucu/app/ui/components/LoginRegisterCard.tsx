'use client';
import InputForm from './InputForm';
import { signUp, signIn } from '../../services/auth';
import '../styles/LoginRegister.css';
import { useState } from 'react';
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'

import { SignUpFormState, SignInFormState } from '../../lib/definitions';


export default function LoginRegisterCard({ teams }: { teams: any; }) {
    console.log("teams", teams)
    console.log("teams lenght", teams.length)
    const router = useRouter();
    const divElementClassname = 'col-8 form-element-div';

    const [signupState, setSignupState] = useState<SignUpFormState>({})


    const [signinState, setSigninState] = useState<SignInFormState>({});

    const [register, setRegister] = useState(false);

    const toggleRegister = () => {
        setRegister(true);
    };

    const toggleLogin = () => {
        setRegister(false);
    };

    const signupValidation = (formData: any) => {
        signUp(formData).then((response) => {
            console.log(response);
            setSignupState({ errors: response?.errors, message: response?.errors?.message });

            if (response?.message === 'User created successfully') {
                setRegister(false);
            }
        });
    };

    const signinValidation = async (formData: any) => {

        signIn(formData)
            .then((response) => {
                console.log(response);
                setSigninState({ errors: response?.errors, message: response?.errors?.message })

                if (response?.errors == undefined) {
                    alert(response?.message);
                }
                if (response.message === 'User logged in successfully') {
                    router.push('/pages/home');
                }
            })
    }


    if (register) {
        return (

            <div className="col col-10 card">

                <div className='card-content form-container register-container'>
                    <form className='row ' action={signupValidation}>
                        <InputForm classname={divElementClassname} id='floatingUsername' type='text' name='username' label='Username' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.usuario && <p>{signupState.errors.usuario}</p>}
                        </div>
                        <InputForm classname={divElementClassname} id='floatingName' type='text' name='name' label='Name' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.nombres && <p>{signupState.errors.nombres}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingLastname' type='text' name='lastname' label='Lastname' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.apellidos && <p>{signupState.errors.apellidos}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingEmail' type='email' name='email' label='Email' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.email && <p>{signupState.errors.email}</p>}
                        </div>

                        <select className='form-select' name='firstPlace'>
                            <option selected>Selecciona campeon</option>
                            {teams?.map((team: any) => (
                                <option value={team.pais}>{team.pais}</option>

                            ))}
                        </select>
                        <select className='form-select' name='secondPlace'>
                            <option selected>Selecciona subcampeon</option>
                            {teams.map((team: any) => (
                                <option value={team.pais}>{team.pais}</option>

                            ))}
                        </select>
                        <div className='input-error-msg'>
                            {signupState?.errors?.segundoLugar && <p>{signupState.errors.segundoLugar}</p>}

                        </div>

                        <InputForm classname={divElementClassname} id='floatingPassword' type='password' name='password' label='Password' />
                        {signupState?.errors?.contrasena?.map((error: any) =>
                            <div className='input-error-msg'><p>{error}</p></div>
                        )}

                        <InputForm classname={divElementClassname} id='floatingConfirmPassword' type='password' name='confirmPassword' label='Confirm password' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.confirmarContrasena && <p>{signupState.errors.confirmarContrasena}</p>}
                        </div>
                        <InputForm classname={divElementClassname} id='floatingCareer' type='text' name='career' label='Career name' />

                        <InputForm classname={divElementClassname} id='floatingRole' type='checkbox' name='admin' label='Admin' />
                        <div className='col-8'>
                            <SignupButton />

                        </div>
                    </form>
                    <div className='form-select-other select-login'>
                        <h3>Ya tienes cuenta?</h3>
                        <button onClick={toggleLogin}>¡Logueate aqui!</button>
                    </div>

                </div>
            </div>
        )
    }
    else {
        return (
            <div className="col col-10 card">

                <div className='card-content form-container login-container'>
                    <form className='row' action={signinValidation}>

                        <InputForm
                            classname={divElementClassname}
                            id='floatingUsername'
                            type='username'
                            name='username'
                            label='Username'
                        />
                        <div className='input-error-msg'>
                            {signinState?.errors?.usuario && <p>{signinState.errors.usuario}</p>}
                        </div>

                        <InputForm
                            classname={divElementClassname}
                            id='floatingPassword'
                            type='password'
                            name='password'
                            label='Password'
                        />
                        <div className='input-error-msg'>
                            {signinState?.errors?.contrasena && <p>{signinState.errors.contrasena}</p>}
                        </div>

                        <div className='col-8'>
                            <SigninButton />
                        </div>
                    </form>
                    <div className='form-select-other select-register'>
                        <h3>¿No tienes cuenta?</h3>
                        <button onClick={toggleRegister}>¡Registrate aqui!</button>
                    </div>
                </div>
            </div>
        )

    }
}



export function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <button className='btn btn-primary' type="submit">
            {pending ? 'Submitting...' : 'Sign up'}
        </button>
    );
}

export function SigninButton() {
    const { pending } = useFormStatus();

    return (
        <button className='btn btn-primary' type="submit">
            {pending ? 'Submitting' : 'Sign in'}
        </button>
    );
}