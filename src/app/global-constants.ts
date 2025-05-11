export class GlobalConstants{

    public static genericError: string = "Щось пішло не так..."

    public static usernameRegex:string =  "^[ґҐіІєЄїЇА-Яа-яa-zA-Z](?!.*\\.$)(?!.*?\\.\\.)(?!.*?--)(?!.*?'')[-'ʼ’ ґҐіІєЄїЇА-Яа-я\\w.]{0,29}$";

    public static emailRegex:string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";

    public static passwordRegex:string = "^(?=.*\\d).{7,}$";
    public static error = "Помилка: ";
}

