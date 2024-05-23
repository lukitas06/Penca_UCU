'use server'
import { cookies } from 'next/headers'
import { SignUpFormSchema,SignInFormSchema ,FormState } from '../lib/definitions'
import bcrypt from 'bcryptjs'
import  {signToken}  from './tokenService'
import jwt from 'jsonwebtoken'

export async function signUp(formData:any) {
  // Validate form fields
  const validatedFields = SignUpFormSchema.safeParse({
    username: formData.get('username'),
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    firstPlace: formData.get('firstPlace'),
    secondPlace: formData.get('secondPlace'),
    career: formData.get('career'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  //Fields to create a user in the db
  const {username, name, lastname, email, firstPlace, secondPlace,career, password} = await validatedFields.data;
  // crypto password
  const cryptedPassword = await bcrypt.hash(password, 10)

  //insert user in the db
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      name,
      lastname,
      email,
      firstPlace,
      secondPlace,
      career,
      password: cryptedPassword
    }),
  })


  // return the response
  return response.json()
}

export async function signIn(formData:any) {
  // Validate form fields
  const validatedFields = SignInFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  // Call the provider or db to validate the user
  const {username, password} = await validatedFields.data;
  const response = await fetch('http://localhost:3000/api/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    }),
  
  })
  if(response.status != 200){
    return response.json();
  }
  const jsonResponse = response.json();

  const clientResponse =jsonResponse.then((data:any) => {

    const role = data.role;
    let userInfo= [];

    if(role== 'admin'){
      userInfo = data.user.adminRes;
    }
    else{
      userInfo = data.user.alumnRes;
    }
    const userPsw = userInfo[0].password;
    const match = bcrypt.compare(password, userPsw);

    const matchRes=  match.then((match:any) =>{
      const username = userInfo[0].username;
      if(match){
        const token = jwt.sign({username,role},'secret', {expiresIn: '1h'});
        return {token:token}
      }
      else{
        return {message: 'Invalid username or password'}
      }
    })
    return matchRes;
  })
  return clientResponse;
}

export async function initiateSession(role:string,username:string){

}