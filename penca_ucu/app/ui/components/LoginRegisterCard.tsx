'use client';
import { any } from 'zod';
import InputForm from './InputForm';
import { signUp, signIn } from '../../actions/auth';
import '../styles/LoginRegister.css';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';


export default function LoginRegisterCard({ teams }: { teams: any[]; }) {
    const divElementClassname = 'col-8 form-element-div';

    console.log(teams);

    const [signupState, setSignupState] = useState({
        errors: any,
        message: any
    });

    const [signinState, setSigninState] = useState({
        errors: any,
        message: any
    });

    const [register, setRegister] = useState(false);

    const toggleRegister = () => {
        setRegister(true);
    };

    const toggleLogin = () => {
        setRegister(false);
    };

    const signupValidation = (formData: any) => {
        signUp(formData).then((response) => {
            console.log(response?.errors.email);
            setSignupState({ errors: response?.errors, message: response?.errors.message });
        });
    };

    const signinValidation = (formData: any) => {
        signIn(formData).then((response) => {
            setSigninState({ errors: response?.errors, message: response?.errors.message });
        });
    };

    if (register) {
        return (
            <div className="col col-10 card">

                <div className='card-content form-container register-container'>
                    <form className='row ' action={signupValidation}>
                        <InputForm classname={divElementClassname} id='floatingName' type='name' name='name' label='Name' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.name && <p>{signupState.errors.name}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingLastname' type='lastname' name='lastname' label='Lastname' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.lastname && <p>{signupState.errors.lastname}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingUsername' type='username' name='usernname' label='Username' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.username && <p>{signupState.errors.username}</p>}
                        </div>

                        <InputForm classname={divElementClassname} id='floatingEmail' type='email' name='email' label='Email' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.email && <p>{signupState.errors.email}</p>}
                        </div>

                        {/* <select className='form-select' name='firstPlace'>
                            <option selected>Selecciona campeon</option>
                            {teams?.map((team:any) =>(
                                <option value={team.name}>{team.name}</option>
                            
                            ))}
                        </select>
                        <select className='form-select' name='secondPlace'>
                            <option selected>Selecciona subcampeon</option>
                            {teams.map((team:any) =>(
                                <option value={team.name}>{team.name}</option>
                            
                            ))}
                        </select> 
                        <div className='input-error-msg'>
                            {signupState?.errors?.secondPlace && <p>{signupState.errors.secondPlace}</p>}
                        </div> */}

                        <InputForm classname={divElementClassname} id='floatingPassword' type='password' name='password' label='Password' />
                        {signupState?.errors?.password?.map((error: any) =>
                            <div className='input-error-msg'><p>{error}</p></div>
                        )}

                        <InputForm classname={divElementClassname} id='floatingConfirmPassword' type='password' name='confirmPassword' label='Confirm password' />
                        <div className='input-error-msg'>
                            {signupState?.errors?.confirmPassword && <p>{signupState.errors.confirmPassword}</p>}
                        </div>
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
        );
    } else {
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
                            {signinState?.errors?.username && <p>{signinState.errors.username}</p>}
                        </div>

                        <InputForm
                            classname={divElementClassname}
                            id='floatingPassword'
                            type='password'
                            name='password'
                            label='Password'
                        />
                        <div className='input-error-msg'>
                            {signinState?.errors?.password && <p>{signinState.errors.password}</p>}
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
        );
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