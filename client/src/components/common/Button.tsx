type TButton = {
    title: string;
};
const Button = ({ title }: TButton): JSX.Element => {
    return <button>{title}</button>;
};

export default Button;
