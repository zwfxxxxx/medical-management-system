import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
    isLoading: boolean;
    children: React.ReactNode;
}

const SubmitButton = ({ isLoading, children }: SubmitButtonProps) => {
    return (
        <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
            {children}
        </Button>
    );
};

export default SubmitButton; 