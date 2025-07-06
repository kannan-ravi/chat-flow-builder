import Button from "../ui/Button"

function Header() {
  return (
    <header className="flex justify-between items-center h-14 bg-gray-100 px-4">
      <h1 className="text-xl font-bold">Chatbot Flow Builder</h1>
      <Button type="button" color="light" size="medium">Save Changes</Button> 
    </header>
  )
}

export default Header