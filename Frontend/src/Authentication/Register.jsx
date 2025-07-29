

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <form action="" method="POST">
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Phone Number" />
                <input type="text" placeholder="Addhaar Number" />
                <input type="text" placeholder="Pan Number" />
                <input type="text" placeholder="Address" />
                <input type="text" placeholder="city" />  
                <input type="text" placeholder="state" />              
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;