import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authState";

const UserHead = ({ ispatient }: { ispatient: boolean }) => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const handleRecord = () => {
    router.push(`/user/${user.userId}/appointmentRecord`);
  };
  // 跳转到个人信息页面
  const handleProfile = () => {
    if (ispatient) {
      router.push(`/user/${user.userId}/personal`);
    }
    // else {
      //   router.push(`/doctor/${user.userId}/personal`);
      //   }
    };
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src="/assets/icons/userinfo.svg"
            height={34}
            width={34}
            alt="UserInfo"
            title="个人信息"
            className="hover:scale-110 transition-transform"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            {
              ispatient && (<><DropdownMenuItem onClick={handleProfile}>个人信息</DropdownMenuItem><DropdownMenuItem onClick={handleRecord}>预约记录</DropdownMenuItem></>
              )
            }
            
            <DropdownMenuItem onClick={handleLogout}>退出登录</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  export default UserHead;