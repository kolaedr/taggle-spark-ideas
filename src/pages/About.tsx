
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';

const About = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={signOut} />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <section className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              About GiveMeWhat
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how our platform works and what makes it special
            </p>
          </section>
          
          <section className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium tracking-tight">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                GiveMeWhat aims to spark creativity and inspiration for everyone. Whether you're a writer, artist, entrepreneur, or just someone looking for fresh ideas, our platform leverages artificial intelligence to generate unique concepts tailored to your interests.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-medium tracking-tight">How It Works</h2>
              <ol className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">1</div>
                  <div>
                    <h3 className="font-medium">Select a Tag</h3>
                    <p className="text-muted-foreground">Choose from our diverse collection of tags such as joke, recipe, startup, story, and more.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">2</div>
                  <div>
                    <h3 className="font-medium">Generate an Idea</h3>
                    <p className="text-muted-foreground">Our AI processes your selection and creates a unique idea based on the selected tag.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">3</div>
                  <div>
                    <h3 className="font-medium">Save Your Favorites</h3>
                    <p className="text-muted-foreground">Create an account to save and organize your favorite ideas for future reference.</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-medium tracking-tight">Technology</h2>
              <p className="text-muted-foreground leading-relaxed">
                GiveMeWhat combines several cutting-edge technologies:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium">AI Idea Generation</h3>
                  <p className="text-sm text-muted-foreground mt-1">Powered by advanced language models to create contextually relevant ideas</p>
                </li>
                <li className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium">Secure Authentication</h3>
                  <p className="text-sm text-muted-foreground mt-1">Protected user accounts to save and manage personal idea collections</p>
                </li>
                <li className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium">Cloud Storage</h3>
                  <p className="text-sm text-muted-foreground mt-1">Reliable storage of user preferences and saved ideas</p>
                </li>
                <li className="bg-secondary p-4 rounded-lg">
                  <h3 className="font-medium">Responsive Design</h3>
                  <p className="text-sm text-muted-foreground mt-1">Optimized experience across all devices and screen sizes</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GiveMeWhat. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default About;
