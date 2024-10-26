import { useResetPassword } from '../hooks/useResetPassword'
import { useState } from 'react'
import { useParams } from'react-router-dom'


const ResetPassword = () => {
    const {resetPassword, isLoading, error, success} = useResetPassword()
    const {token} = useParams()
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        resetPassword(token, password)
    }

    return (
        <>
        <form className="login">
        {!success && (<>
            <h3>Reset Password</h3>
            <p>Enter your new password.</p>
            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
            <span>
                <button disabled={isLoading} onClick={handleSubmit}>Reset Password</button>
            </span>
            </>
        )}
        {success && <div className="success">Your password has been reset!</div>}
        {error && <div className="error">{error}</div>}
        </form> 
        </>
        )
}
 
export default ResetPassword;