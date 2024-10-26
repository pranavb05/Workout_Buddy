import { useResetPasswordEmail } from '../hooks/useResetPasswordEmail'
import { useState } from 'react'

const ResetPasswordEmail = () => {
    const {resetPasswordEmail, isLoading, error, success} = useResetPasswordEmail()
    const [email, setEmail] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        resetPasswordEmail(email)
    }
    return (
        <>
        <form className="login">
        {!success && (<>
            <h3>Forgot Password</h3>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
            <label>Email:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />
            <span>
                <button disabled={isLoading} onClick={handleSubmit}>Send Password Reset</button>
            </span>
            </>
        )}
        {success && <div className="success">Check your inbox for the password reset link.</div>}
        {error && <div className="error">{error}</div>}
        </form> 
        </>
        );
}
 
export default ResetPasswordEmail;