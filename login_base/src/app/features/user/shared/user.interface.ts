// Current user
export interface UserInterface {
    id: string;
    username: string;
    password: string;
    name: string;
    lastname: string;
    email: string;
    phone_house: string;
    phone_cel: string;
    postal_code: string;
    street: string;
    external_number: string;
    internal_number: string;
    roleId: string;
    role: string;
    createdAt: string;
    updatedAt: string;    
    accessToken: string; // This is the JWT from the server
    refreshToken: string;
}

// Sign In form data
export interface signInFormInterface {
    username: string | null;
    password: string | null;
}

// usersListInterface
export interface userListInterface extends UserInterface{
    data:{
        rows: UserInterface[] | [];
        total_count: number | 0;    
    },
    message: ''
}