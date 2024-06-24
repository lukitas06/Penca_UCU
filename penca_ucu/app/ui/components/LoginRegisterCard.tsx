'use client';

import InputForm from './InputForm';
import { signUp, signIn } from '../../services/auth';
import '../styles/LoginRegister.css';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { SignUpFormState, SignInFormState } from '../../lib/definitions';

export default function LoginRegisterCard({ teams }: { teams: any; }) {

    const router = useRouter();
    const divElementClassname = 'col-8 form-element-div';
    const [signUpState, setsignUpState] = useState<SignUpFormState>({});
    const [signInState, setsignInState] = useState<SignInFormState>({});
    const [register, setRegister] = useState(false);

    const toggleRegister = () => {
        setRegister(true);
    };

    const toggleLogin = () => {
        setRegister(false);
    };

    const signupValidation = (formData: any) => {
        signUp(formData).then((response) => {
            setsignUpState({ errors: response?.errors, message: response?.errors?.message });

            console.log("response", response);
            if (response?.message === 'User created successfully') {
                alert(response?.message);
                setRegister(false);
            }
            else {
                alert(response?.message);
            }
        });
    };

    const signinValidation = async (formData: any) => {

        signIn(formData).then((response) => {
            setsignInState({ errors: response?.errors, message: response?.errors?.message });
            setsignInState({ errors: response?.errors, message: response?.errors?.message });

            if (response?.errors == undefined) {
                alert(response?.message);
            }

            if (response.message === 'User logged in successfully') {
                router.push('/pages/home');
            }
        });
    };

    if (register) {
        return (
            <div className="col col-10 card">
                <div className='card-content form-container register-container'>
                    <h1 className='card-title'>Register</h1>
                    <form className='row ' action={signupValidation}>
                        <InputForm classname={divElementClassname} id='floatingUsername' type='text' name='username' label='Username' />
                        <div className='input-error-msg'>
                            {signUpState?.errors?.usuario && <p>{signUpState.errors.usuario}</p>}
                        </div>
                        <InputForm classname={divElementClassname} id='floatingName' type='text' name='name' label='Name' />
                        <div className='input-error-msg'>
                            {signUpState?.errors?.nombres && <p>{signUpState.errors.nombres}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingLastname' type='text' name='lastname' label='Lastname' />
                        <div className='input-error-msg'>
                            {signUpState?.errors?.apellidos && <p>{signUpState.errors.apellidos}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingEmail' type='email' name='email' label='Email' />
                        <div className='input-error-msg'>
                            {signUpState?.errors?.email && <p>{signUpState.errors.email}</p>}
                        </div>

                        <select className='form-select' name='firstPlace'>
                            <option selected>Selecciona campeón</option>
                            {teams?.map((team: any) => (
                                <option value={team.pais}>{team.pais}</option>
                            ))}
                        </select>

                        <select className='form-select' name='secondPlace'>
                            <option selected>Selecciona subcampeón</option>
                            {teams.map((team: any) => (
                                <option value={team.pais}>{team.pais}</option>
                            ))}
                        </select>

                        <div className='input-error-msg'>
                            {signUpState?.errors?.segundo_lugar && <p>{signUpState.errors.segundo_lugar}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingPassword' type='password' name='password' label='Password' />
                        {signUpState?.errors?.contrasena?.map((error: any) =>
                            <div className='input-error-msg'><p>{error}</p></div>
                        )}

                        <InputForm classname={divElementClassname} id='floatingConfirmPassword' type='password' name='confirmPassword' label='Confirm password' />
                        <div className='input-error-msg'>
                            {signUpState?.errors?.confirmarContrasena && <p>{signUpState.errors.confirmarContrasena}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingCareer' type='text' name='career' label='Career name' />

                        <div className='col-8'>
                            <SignupButton />
                        </div>
                    </form>
                    <div className='form-select-other select-login'>
                        <h3>¿Ya tenés cuenta?</h3>
                        <button onClick={toggleLogin}>¡Logueate acá!</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="col col-10 card">
                <div className='card-body form-container login-container'>
                    <h1 className="card-title">Login</h1>
                    <form className='row' action={signinValidation}>

                        <InputForm
                            classname={divElementClassname}
                            id='floatingUsername'
                            type='username'
                            name='username'
                            label='Username'
                        />

                        <div className='input-error-msg'>
                            {signInState?.errors?.usuario && <p>{signInState.errors.usuario}</p>}
                        </div>

                        <InputForm
                            classname={divElementClassname}
                            id='floatingPassword'
                            type='password'
                            name='password'
                            label='Password'
                        />

                        <div className='input-error-msg'>
                            {signInState?.errors?.contrasena && <p>{signInState.errors.contrasena}</p>}
                        </div>

                        <div className='col-8'>
                            <SigninButton />
                        </div>

                    </form>
                    <div className='form-select-other select-register'>
                        <h3>¿No tenés cuenta?</h3>
                        <button onClick={toggleRegister}>¡Registrate acá!</button>
                    </div>
                </div>
            </div>
        );
    }
}



export function SignupButton() {
    const { pending } = useFormStatus();

    return (
        <button className='btn btn-primary form-submit' type="submit">
            {pending ? 'Submitting...' : 'Sign up'}
        </button>
    );
}

export function SigninButton() {
    const { pending } = useFormStatus();

    return (
        <button className='btn btn-primary form-submit' type="submit">
            {pending ? 'Submitting' : 'Sign in'}
        </button>
    );
}