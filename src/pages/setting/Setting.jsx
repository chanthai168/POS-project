import { Link } from "react-router-dom";

const foodManagementIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M1 22c0 .54.45 1 1 1h13c.56 0 1-.46 1-1v-1H1zM8.5 9C4.75 9 1 11 1 15h15c0-4-3.75-6-7.5-6m-4.88 4c1.11-1.55 3.47-2 4.88-2s3.77.45 4.88 2zM1 17h15v2H1zM18 5V1h-2v4h-5l.23 2h9.56l-1.4 14H18v2h1.72c.84 0 1.53-.65 1.63-1.47L23 5z"></path></svg>
const adminIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m9 6h1v5h-8v-5h1v-1a3 3 0 1 1 6 0zm-2 0v-1a1 1 0 1 0-2 0v1z"></path></svg>;
const colorIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20"><path fill="currentColor" d="M9.75 6.5a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5m3 1a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5m2.5 1.5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m-.75 3.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5M13.25 14a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m.447-11.008c-2.754-1.415-5.554-1.28-7.927.174c-1.21.742-2.517 2.303-3.254 3.893c-.37.8-.617 1.646-.614 2.434c.004.801.268 1.566.938 2.112c.61.498 1.142.748 1.656.773c.518.026.922-.184 1.238-.37l.197-.119c.242-.147.441-.268.69-.346c.28-.09.637-.122 1.155.036c.19.058.306.144.386.244c.086.106.155.254.206.466c.052.213.08.464.1.76c.009.11.016.237.023.369c.012.192.023.397.039.586c.054.67.17 1.436.574 2.132c.414.713 1.1 1.303 2.203 1.68c1.602.548 3.066.103 4.206-.8c1.126-.891 1.956-2.24 2.371-3.589c1.315-4.273-.211-8.393-4.187-10.435M6.292 4.019c2.065-1.265 4.492-1.4 6.948-.138c3.507 1.802 4.873 5.4 3.688 9.252c-.366 1.19-1.094 2.354-2.036 3.1c-.929.735-2.043 1.053-3.261.637c-.904-.31-1.384-.757-1.663-1.236c-.288-.497-.39-1.078-.442-1.712c-.015-.189-.025-.36-.035-.534l-.025-.41a6 6 0 0 0-.126-.925a2.2 2.2 0 0 0-.4-.86a1.75 1.75 0 0 0-.872-.57c-.702-.215-1.265-.187-1.75-.034c-.375.12-.698.317-.946.47l-.146.087c-.285.169-.472.244-.68.234c-.213-.01-.543-.118-1.074-.55c-.385-.314-.567-.763-.57-1.34c-.002-.591.186-1.288.521-2.01c.674-1.453 1.862-2.844 2.87-3.461"></path></svg>;
const colorIcon2 = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M3.839 5.858c2.94-3.916 9.03-5.055 13.364-2.36c4.28 2.66 5.854 7.777 4.1 12.577c-1.655 4.533-6.016 6.328-9.159 4.048c-1.177-.854-1.634-1.925-1.854-3.664l-.106-.987l-.045-.398c-.123-.934-.311-1.352-.705-1.572c-.535-.298-.892-.305-1.595-.033l-.351.146l-.179.078c-1.014.44-1.688.595-2.541.416l-.2-.047l-.164-.047c-2.789-.864-3.202-4.647-.565-8.157m.984 6.716l.123.037l.134.03c.439.087.814.015 1.437-.242l.602-.257c1.202-.493 1.985-.54 3.046.05c.917.512 1.275 1.298 1.457 2.66l.053.459l.055.532l.047.422c.172 1.361.485 2.09 1.248 2.644c2.275 1.65 5.534.309 6.87-3.349c1.516-4.152.174-8.514-3.484-10.789c-3.675-2.284-8.899-1.306-11.373 1.987c-2.075 2.763-1.82 5.28-.215 5.816m11.225-1.994a1.25 1.25 0 1 1 2.414-.647a1.25 1.25 0 0 1-2.414.647m.494 3.488a1.25 1.25 0 1 1 2.415-.647a1.25 1.25 0 0 1-2.415.647M14.07 7.577a1.25 1.25 0 1 1 2.415-.647a1.25 1.25 0 0 1-2.415.647m-.028 8.998a1.25 1.25 0 1 1 2.414-.647a1.25 1.25 0 0 1-2.414.647m-3.497-9.97a1.25 1.25 0 1 1 2.415-.646a1.25 1.25 0 0 1-2.415.646"></path></svg>;
const userIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5m0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3s-3-1.35-3-3s1.35-3 3-3M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1m6-7h4c2.76 0 5 2.24 5 5H5c0-2.76 2.24-5 5-5"></path></svg>
const lockIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M18.709 3.495C16.817 2.554 14.5 2 12 2s-4.816.554-6.709 1.495c-.928.462-1.392.693-1.841 1.419S3 6.343 3 7.748v3.49c0 5.683 4.542 8.843 7.173 10.196c.734.377 1.1.566 1.827.566s1.093-.189 1.827-.566C16.457 20.08 21 16.92 21 11.237V7.748c0-1.405 0-2.108-.45-2.834s-.913-.957-1.841-1.419"></path><path d="M12 9v1m-1-.5a1 1 0 1 0 2 0a1 1 0 0 0-2 0"></path><path d="M12.75 14h-1.5l.75-3.5z"></path></g></svg>;
const termIcon = <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32"><path fill="currentColor" d="M28 26h-3v-2h3V8h-3V6h3a2 2 0 0 1 2 2v16a2.003 2.003 0 0 1-2 2"></path><circle cx={23} cy={16} r={2} fill="currentColor"></circle><circle cx={16} cy={16} r={2} fill="currentColor"></circle><circle cx={9} cy={16} r={2} fill="currentColor"></circle><path fill="currentColor" d="M7 26H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3v2H4v16h3Z"></path></svg>;
const languageIcon = <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24"><path fill="currentColor" d="m12.87 15.07l-2.54-2.51l.03-.03A17.5 17.5 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7l1.62-4.33L19.12 17z"></path></svg>

import FadeInSection from "../../components/animation/FadeInSection";

function Setting(){

    return(
        <>
        <div className="flex flex-col items-center ">
            <div className="w-full mb-6 mt-0 md:w-full flex flex-col items-center justify-center lg:w-fit">
                <h2 className="mt-0 text-3xl text-heading2 my-6 w-full">Setting</h2>
                <div className=" bg-soft-white w-full md:w-3xl lg:w-6xl rounded-edge border-white border p-10">
                    
                    <div className=" text-base-text  flex flex-col gap-2  mb-72">
                        <FadeInSection playTime={0.2} delay={0}>
                            <Link 
                                className="flex items-center gap-6">
                                {foodManagementIcon} 
                                Food management
                            </Link>
                        </FadeInSection>


                        <FadeInSection playTime={0.25} delay={0.1}>
                            <Link 
                                className="flex items-center gap-6">
                                {adminIcon} 
                                Admin profile
                            </Link>
                        </FadeInSection>


                        <FadeInSection playTime={0.3} delay={0.125}>
                            <Link 
                                className="flex items-center gap-6 ">
                                {colorIcon2}
                                Color mode
                            </Link>
                        </FadeInSection>

                        <FadeInSection playTime={0.3} delay={0.125}>
                            <Link 
                                className="flex items-center gap-6 ">
                                {languageIcon}
                                Languages
                            </Link>
                        </FadeInSection>



                        <FadeInSection playTime={0.35} delay={0.135}>
                            <Link 
                                className="flex items-center gap-6">
                                {userIcon} 
                                Switch to user mode
                            </Link>
                        </FadeInSection>

                    </div>


                    <div className=" text-base-text flex flex-col gap-2">
                        <FadeInSection playTime={0.3} delay={0.1}>
                            <Link 
                                className="flex items-center gap-6">
                                {lockIcon} 
                                Security & Privacy
                            </Link>
                        </FadeInSection>
                        <FadeInSection playTime={0.3} delay={0.125}>
                            <Link 
                                className="flex items-center gap-6">
                                {termIcon} 
                                Term & Service
                            </Link>
                        </FadeInSection>

                    </div>

                    <div className=" text-base-text   flex flex-col gap-1 text-right mt-8">
                        <FadeInSection playTime={0.3} delay={0.2}>
                            <h2 className=" text-lg">Made in Cambodia</h2>
                            <p >© All right, reserve.</p>
                        </FadeInSection>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Setting;