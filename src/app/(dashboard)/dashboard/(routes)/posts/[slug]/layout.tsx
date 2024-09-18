export default function Layout({ 
    children, 
    example,
}: { 
    children: React.ReactNode,
    example: React.ReactNode
}) {
    return (
        <>
            {children}
            {/* {example} */}
        </>
    );
}