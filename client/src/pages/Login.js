import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const [showPassword, setShowPassword] = useState('password')

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    const handleCheckbox = (e) => {
        if (e.target.checked){
            setShowPassword('text')
        }
        if (!e.target.checked){
            setShowPassword('password')
        }
    }

    return(
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            />
            <label>Password:</label>
            <input 
            type={showPassword}
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            />
            <span>
                <button disabled={isLoading}>Login</button>
                <div className="labelAndCheckbox">
                    <input type='checkbox' onChange={handleCheckbox}></input> 
                    <label>Show Password</label>
                </div>
            </span>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login;