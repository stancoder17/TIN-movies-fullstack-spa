import {useEffect, useState} from "react";
import styles from './Register.module.css';
import {useNavigate} from "react-router-dom";
import {validateNickname, validatePasswordPost, validateDateOfBirth, validateEmail} from "../../../utils/UserValidation.js";

function Register() {
    const navigate = useNavigate();
    const [fields, setFields] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        date_of_birth: '',
        password: '',
        confirm_password: ''
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/users/register-form-fields')
            .then(response => response.json())
            .then(data => {
                const config = Object.fromEntries(data.map(field => [field.name, field]));
                setFields(config);
            })
            .catch(error => console.error('Error fetching register form fields:', error));
    }, []);

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        setErrors({...errors, [name]: validateField(name, value)});
    }

    const validateField = (fieldName, fieldValue) => {
        switch (fieldName) {
            case 'nickname':
                return validateNickname(fieldValue);
            case 'email':
                return validateEmail(fieldValue);
            case 'password':
                return validatePasswordPost(fieldValue);
            case 'date_of_birth':
                return validateDateOfBirth(fieldValue);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for errors before submitting
        const allErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                allErrors[key] = error;
            }
        });

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/movies', {replace: true});
            } else {
                const error = await response.json();
                error.errors ?
                    alert(error.errors.map(err => err).join('\n')) :
                    alert(error.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }

    return (
        <div className={styles.registerWrapper}>
            <div className={`main-content ${styles.mainContent || ''}`.trim()}>

                <h1 className="app-name-text">moviezz</h1>

                <div className={`form-container ${styles.formContainer || ''}`.trim()}>
                    <h1>Create an account</h1>
                    <hr className="separator separator-bright"/>
                    {fields && (
                        <form className="form-login-or-register" noValidate={true} onSubmit={handleSubmit}>
                            <div className="form-inputs-container">

                                <div className={`form-nickname ${styles.formNickname || ''}`.trim()}>
                                    {errors.nickname && <>
                                        <span className="form-error">{errors.nickname}</span> <br/>
                                    </>}
                                    <input
                                        type={fields.nickname.type}
                                        placeholder={fields.nickname.label}
                                        name={fields.nickname.name}
                                        required={fields.nickname.required}
                                        minLength={fields.nickname.minLength}
                                        maxLength={fields.nickname.maxLength}
                                        value={formData.nickname}
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="form-date-of-birth">
                                    {errors.date_of_birth ?
                                        (<>
                                            <span className="form-error">{errors.date_of_birth}</span>
                                            <br/>
                                        </>
                                        ) : <p className="form-additional-text">{fields.date_of_birth.label}</p>
                                    }
                                    <input
                                        type={fields.date_of_birth.type}
                                        name={fields.date_of_birth.name}
                                        required={fields.date_of_birth.required}
                                        min={fields.date_of_birth.min}
                                        value={formData.date_of_birth}
                                        onChange={onChange}
                                    />
                                </div>

                                {errors.email && <span className="form-error">{errors.email}</span>}
                                <input
                                    type={fields.email.type}
                                    name={fields.email.name}
                                    placeholder={fields.email.label}
                                    required={fields.email.required}
                                    minLength={fields.email.minLength}
                                    maxLength={fields.email.maxLength}
                                    pattern={fields.email.pattern}
                                    value={formData.email}
                                    onChange={onChange}
                                />

                                {errors.password && <span className="form-error">{errors.password}</span>}
                                <input
                                    type={fields.password.type}
                                    name={fields.password.name}
                                    placeholder={fields.password.label}
                                    autoComplete="new-password"
                                    required={fields.password.required}
                                    minLength={fields.password.minLength}
                                    maxLength={fields.password.maxLength}
                                    value={formData.password}
                                    onChange={onChange}
                                />

                            </div>
                            <div className="form-buttons-etc">

                                <button className="login-or-register-button" type="submit">Register</button>

                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Register;