export const pick = (a) => a[Math.floor(Math.random() * a.length)];
export const shuffle = (a) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

// o = options, a = index of correct option, e = explanation
export const QUESTIONS = [
  { topic: "Pillars", q: "Making fields private and exposing them only through getters and setters is an example of:", o: ["Encapsulation", "Inheritance", "Polymorphism", "Overloading"], a: 0, e: "Encapsulation bundles data with the methods that touch it and restricts direct access to the internals." },
  { topic: "Pillars", q: "Which describes a class that cannot be instantiated and may contain abstract methods?", o: ["Final class", "Abstract class", "Static class", "Singleton"], a: 1, e: "An abstract class is a partial blueprint. Subclasses must fill in the abstract methods." },
  { topic: "Pillars", q: "The same method call behaves differently depending on the object's actual type. This is:", o: ["Encapsulation", "Composition", "Polymorphism", "Coupling"], a: 2, e: "Polymorphism means one interface, many behaviors, chosen by the real runtime type." },
  { topic: "Pillars", q: "Method overloading means:", o: ["A subclass replaces a parent method", "Same method name, different parameter lists", "Calling a method too many times", "Hiding a method with private"], a: 1, e: "Overloading is resolved at compile time by the parameter list. Overriding is the runtime one." },
  { topic: "Pillars", q: "A subclass providing its own version of an inherited method is called:", o: ["Overloading", "Shadowing", "Overriding", "Encapsulating"], a: 2, e: "Overriding replaces inherited behavior and is resolved at runtime." },
  { topic: "Basics", q: "What is a constructor for?", o: ["Destroying an object", "Copying a class", "Initializing a new object when it is created", "Declaring static members"], a: 2, e: "A constructor runs when an object is created and sets up its initial state." },
  { topic: "Basics", q: "A static member belongs to:", o: ["Each object separately", "The class itself", "Only the subclass", "The garbage collector"], a: 1, e: "Static members are shared by the class and need no instance." },
  { topic: "Basics", q: "Which access modifier restricts a member to its own class only?", o: ["public", "protected", "private", "default"], a: 2, e: "private means only code inside the same class can access the member." },
  { topic: "Basics", q: "In the code below, what does super.speak() do?", code: "class Dog extends Animal {\n  void speak() {\n    super.speak();\n    System.out.println(\"Woof\");\n  }\n}", o: ["Calls the parent class's speak()", "Calls Dog's speak() forever", "Creates a new Animal", "Fails to compile"], a: 0, e: "super refers to the parent class, so Animal's speak() runs first and then 'Woof' prints." },
  { topic: "Relationships", q: "A Car has an Engine. Which relationship is this?", o: ["is-a (inheritance)", "has-a (composition)", "uses-a (static)", "can-a (interface)"], a: 1, e: "Car is not a kind of Engine. It contains one, so that is composition." },
  { topic: "Relationships", q: "Why do many developers say 'favor composition over inheritance'?", o: ["Inheritance is not allowed anymore", "It gives looser coupling and more flexible designs", "Composition always runs faster", "Composition removes the need for classes"], a: 1, e: "Deep inheritance trees tightly couple children to parents. Composition lets you swap parts." },
  { topic: "Relationships", q: "The Singleton pattern ensures:", o: ["A class has exactly one instance with a global access point", "Every object has a unique ID", "A class has only one method", "Objects can't be copied"], a: 0, e: "Singleton restricts instantiation to one object and gives everyone access to it." },
  { topic: "SOLID", q: "What does the Single Responsibility Principle say?", o: ["A class should have only one instance", "A class should have one reason to change", "A class should have one method", "A class should extend one parent"], a: 1, e: "SRP is about one reason to change, not one method or one instance." },
  { topic: "SOLID", q: "The Liskov Substitution Principle says:", o: ["Subclasses must be usable wherever the parent is expected", "All classes must be final", "Every class needs an interface", "Private fields must be public"], a: 0, e: "If code works with a Bird, it should keep working with any subclass of Bird." },
  { topic: "SOLID", q: "Dependency Inversion says high-level modules should depend on:", o: ["Concrete classes", "Low-level modules directly", "Abstractions", "Global variables"], a: 2, e: "Depend on interfaces so details can change without breaking high-level code." },
  { topic: "SOLID", q: "The Open/Closed Principle says software entities should be:", o: ["Open for extension, closed for modification", "Open to everyone, closed at night", "Modified for every new feature", "Closed to inheritance and extension"], a: 0, e: "Add behavior through extension points instead of repeatedly rewriting stable code." },
  { topic: "SOLID", q: "The Interface Segregation Principle advises you to:", o: ["Make one giant interface for consistency", "Split broad interfaces into focused ones", "Avoid interfaces entirely", "Put all methods in a base class"], a: 1, e: "Clients should not depend on methods they do not use." },
  { topic: "Basics", q: "What is the main purpose of an interface?", o: ["Store object state", "Define a contract that implementations follow", "Create objects directly", "Prevent polymorphism"], a: 1, e: "An interface describes capabilities without prescribing a specific implementation." },
  { topic: "Basics", q: "What does the `this` keyword usually refer to?", o: ["The current object", "The parent class", "The next object created", "A static method"], a: 0, e: "`this` refers to the current instance, often to distinguish its fields from parameters." },
  { topic: "Basics", q: "In Java, a final method:", o: ["Cannot be overridden", "Must be static", "Has no body", "Cannot be called"], a: 0, e: "A final method can be inherited and called, but subclasses cannot override it." },
  { topic: "Basics", q: "What is an object?", o: ["A running instance of a class", "A package of source files", "A method parameter list", "A compiler error"], a: 0, e: "A class defines a shape; an object is a particular instance with its own state." },
  { topic: "Pillars", q: "Which OOP idea lets a subclass reuse behavior from a parent class?", o: ["Inheritance", "Encapsulation", "Abstraction", "Casting"], a: 0, e: "Inheritance lets a subclass build on members it inherits from a parent." },
  { topic: "Pillars", q: "Abstraction is mainly about:", o: ["Showing essential behavior while hiding implementation details", "Making every field public", "Copying one object into another", "Preventing classes from working together"], a: 0, e: "Abstraction exposes what a component does while hiding how it does it." },
  { topic: "Pillars", q: "A field marked private is best accessed from outside its class through:", o: ["A getter or another public method", "A subclass cast", "The garbage collector", "A constructor name"], a: 0, e: "A class can protect its invariants by controlling access through methods." },
  { topic: "Relationships", q: "A Library uses a Book object temporarily to print a report. This is closest to:", o: ["Dependency", "Inheritance", "Composition", "Overloading"], a: 0, e: "A dependency means one component uses another, often for a limited operation." },
  { topic: "Relationships", q: "In composition, the contained object's lifecycle is typically:", o: ["Owned by the containing object", "Always longer than the container", "Managed only by a subclass", "Unrelated to the container"], a: 0, e: "Composition models strong ownership: the part is created and managed as part of its whole." },
  { topic: "Relationships", q: "Which design is usually easier to extend without changing existing callers?", o: ["Program to an interface", "Call every concrete class directly", "Use global state", "Duplicate the same conditional everywhere"], a: 0, e: "Callers depending on an abstraction can work with new implementations more easily." },
  { topic: "Design", q: "A class that both saves invoices and sends email has how many likely reasons to change?", o: ["At least two", "Exactly zero", "One, because it is one class", "Four, by definition"], a: 0, e: "Persistence and notification are separate responsibilities with separate change triggers." },
  { topic: "Design", q: "Why can deep inheritance hierarchies become painful?", o: ["Changes in a base class can ripple through many subclasses", "They make objects impossible to create", "They remove all code reuse", "They prevent methods from being called"], a: 0, e: "Subclasses inherit assumptions and behavior, so base changes can have surprising effects." },
  { topic: "Design", q: "A method accepts a PaymentProcessor interface. What benefit does this provide?", o: ["Different processors can be substituted", "The method can only use one processor forever", "The interface stores payment data", "It removes the need for testing"], a: 0, e: "The caller can provide any implementation that fulfills the contract." },
  { topic: "Design", q: "What is tight coupling?", o: ["Components rely heavily on each other's details", "A class has many useful methods", "Objects are stored close together", "A method has a short name"], a: 0, e: "Tightly coupled components are harder to change independently." },
  { topic: "Design", q: "When is composition a good alternative to inheritance?", o: ["When behavior should be assembled or swapped independently", "Whenever a class has a constructor", "When objects must have no methods", "Only when there is one class"], a: 0, e: "Composition makes behavior modular and replaceable without forcing an is-a relationship." },
  { topic: "Patterns", q: "Which pattern lets you add behavior to an object by wrapping it?", o: ["Decorator", "Singleton", "Factory Method", "Observer"], a: 0, e: "A decorator wraps an object and adds behavior while keeping the same interface." },
  { topic: "Patterns", q: "Which pattern notifies interested objects when another object's state changes?", o: ["Observer", "Builder", "Adapter", "Singleton"], a: 0, e: "Observer maintains subscribers and notifies them when the subject changes." },
  { topic: "Patterns", q: "A factory is useful when you want to:", o: ["Centralize object creation choices", "Guarantee every class is a singleton", "Replace all constructors with fields", "Hide every method"], a: 0, e: "Factories separate the decision about which concrete object to create from its use." },
  { topic: "Patterns", q: "The Strategy pattern helps you:", o: ["Swap an algorithm behind a shared interface", "Store every object globally", "Make a class impossible to extend", "Avoid using objects"], a: 0, e: "Strategies package interchangeable behaviors behind a common contract." },
  { topic: "Patterns", q: "What is a common drawback of Singleton?", o: ["It can hide dependencies and complicate testing", "It prevents shared access", "It requires every method to be abstract", "It makes object creation impossible"], a: 0, e: "Global access can make dependencies less visible and tests harder to isolate." },
  { topic: "Basics", q: "What does overriding require?", o: ["A compatible inherited method signature", "A different method name", "A static field", "A private parent method"], a: 0, e: "An override provides a compatible implementation of an inherited method." },
  { topic: "Basics", q: "What is the difference between a class and an object?", o: ["A class is a blueprint; an object is an instance", "They are always identical", "An object defines a class", "A class can never have state"], a: 0, e: "A class describes structure and behavior; objects are concrete instances of it." },
  { topic: "Module 1 · Java Fundamentals", q: "What happens between compiling a .java file and running it on the JVM?", o: ["Java source becomes bytecode in a .class file", "Java source becomes a .js file", "The JVM converts it directly to HTML", "The compiler creates a database"], a: 0, e: "javac compiles source into platform-independent bytecode, which the JVM executes." },
  { topic: "Module 1 · Java Fundamentals", q: "Which Java type stores true or false?", o: ["boolean", "char", "String", "int"], a: 0, e: "The primitive boolean type stores either true or false." },
  { topic: "Module 1 · Java Fundamentals", q: "Which loop checks its condition after running the body?", o: ["do-while", "while", "for", "enhanced for"], a: 0, e: "A do-while loop evaluates the condition after its body, so it runs at least once." },
  { topic: "Module 1 · Java Fundamentals", q: "What does continue do inside a loop?", o: ["Skips to the next iteration", "Ends the entire program", "Exits the loop permanently", "Restarts the JVM"], a: 0, e: "continue skips the remaining statements in the current iteration and proceeds with the next one." },
  { topic: "Module 1 · Java Fundamentals", q: "Which class commonly reads keyboard input in beginner Java programs?", o: ["Scanner", "FileWriter", "StringBuilder", "RandomAccessFile"], a: 0, e: "java.util.Scanner can read tokens and lines from System.in." },
  { topic: "Module 1 · Java Fundamentals", q: "What must be true when a Java source file has a public top-level class?", o: ["The filename matches the public class name", "The filename must be Main.java", "The class must contain an array", "The file must be inside java.util"], a: 0, e: "The public class name and source filename must match, including capitalization." },
  { topic: "Module 1 · Java Fundamentals", q: "What is the result of 17 % 5 in Java?", o: ["2", "3", "3.4", "12"], a: 0, e: "The remainder operator % returns the remainder after integer division." },
  { topic: "Module 2 · Methods & Objects", q: "In `int total = add(4, 6);`, what are 4 and 6?", o: ["Arguments", "Return types", "Fields", "Method declarations"], a: 0, e: "Arguments are the actual values passed when a method is called; parameters receive them." },
  { topic: "Module 2 · Methods & Objects", q: "What must a non-void Java method do on every valid path?", o: ["Return a value compatible with its declared type", "Print its result", "Be declared static", "Create an object"], a: 0, e: "A value-returning method must return a value compatible with its return type." },
  { topic: "Module 2 · Methods & Objects", q: "If `int[] scores = new int[5];`, what is `scores.length`?", o: ["5", "4", "The last score value", "The number of initialized elements only"], a: 0, e: "An array's length field gives its fixed number of elements." },
  { topic: "Module 2 · Methods & Objects", q: "For an array of length 5, which index is valid as the last element?", o: ["4", "5", "-1", "6"], a: 0, e: "Java array indexes start at zero, so a length-5 array uses indexes 0 through 4." },
  { topic: "Module 2 · Methods & Objects", q: "What does `this.name = name;` commonly distinguish in a constructor?", o: ["The object's field from a parameter with the same name", "A local variable from a static method", "The parent object from the child", "A class from its package"], a: 0, e: "this.name refers to the current object's field; name refers to the constructor parameter." },
  { topic: "Module 2 · Methods & Objects", q: "What does a static field belong to?", o: ["The class, shared across its instances", "Only the first object created", "Each method call separately", "The package folder"], a: 0, e: "A static member belongs to the class rather than to each individual instance." },
  { topic: "Module 2 · Methods & Objects", q: "What does `final` mean for a local variable after it is assigned?", o: ["It cannot be assigned again", "It becomes public", "It is shared by every class", "It is automatically returned"], a: 0, e: "A final local variable can be assigned once and cannot later be reassigned." },
  { topic: "Module 3 · Core OOP", q: "Which access level allows access in the same package and in subclasses outside it?", o: ["protected", "private", "public only", "package-private only"], a: 0, e: "protected members are accessible in the same package and by subclasses, including subclasses in other packages." },
  { topic: "Module 3 · Core OOP", q: "Can a Java class extend two classes at the same time?", o: ["No; a class has one direct superclass", "Yes, if both are abstract", "Yes, using commas", "Only if both are in the same package"], a: 0, e: "Java supports single inheritance for classes, though a class can implement multiple interfaces." },
  { topic: "Module 3 · Core OOP", q: "Which keyword connects a class to an interface?", o: ["implements", "extends", "inherits", "instanceof"], a: 0, e: "A class uses implements to promise the behavior declared by an interface." },
  { topic: "Module 3 · Core OOP", q: "Are constructors inherited or overridden in Java?", o: ["No; constructors are neither inherited nor overridden", "Yes, like every public method", "Only when they are static", "Only when the parent is abstract"], a: 0, e: "A subclass declares its own constructors and may call a superclass constructor with super(...)." },
  { topic: "Module 3 · Core OOP", q: "An `Employee` reference points to a `Manager` object, and an overridden method is called. Which implementation runs?", o: ["Manager's implementation at runtime", "Always Employee's implementation", "Both implementations at once", "Neither; upcasting prevents calls"], a: 0, e: "Dynamic binding selects an overridden instance method using the actual object's type." },
  { topic: "Module 4 · Advanced Java", q: "A checked exception must generally be:", o: ["Caught or declared with throws", "Ignored by the compiler", "Converted to a boolean", "Declared static"], a: 0, e: "Java requires checked exceptions to be caught or declared in the method signature." },
  { topic: "Module 4 · Advanced Java", q: "What is the difference between `throw` and `throws`?", o: ["throw raises an exception; throws declares possible propagation", "throw declares a method; throws catches an exception", "They are identical", "throws creates a custom exception class"], a: 0, e: "Use throw with an exception object in code; use throws in a method declaration." },
  { topic: "Module 4 · Advanced Java", q: "Why use try-with-resources when reading a file?", o: ["It closes the resource automatically", "It suppresses every exception", "It makes the file permanent", "It converts text into bytecode"], a: 0, e: "Resources declared in try-with-resources are closed automatically when the block exits." },
  { topic: "Module 4 · Advanced Java", q: "Which superclass creates a checked custom exception?", o: ["Exception", "RuntimeException", "Error", "ObjectOutputStream"], a: 0, e: "A custom exception extending Exception is checked unless it extends RuntimeException instead." },
  { topic: "Module 4 · Advanced Java", q: "Which stream family is intended for character text rather than raw bytes?", o: ["Reader and Writer", "InputStream and OutputStream", "Object and Serializable", "Thread and Runnable"], a: 0, e: "Reader and Writer classes process character data; byte streams handle raw bytes." },
  { topic: "Module 4 · Advanced Java", q: "What does `ArrayList<String>` express?", o: ["A list intended to hold String values", "A fixed-size array of strings", "A map from integers to strings", "A list that sorts itself alphabetically"], a: 0, e: "Generics provide a compile-time element type and reduce unsafe casts." },
  { topic: "Module 4 · Advanced Java", q: "Which collection stores key-value pairs?", o: ["Map", "Set", "Queue", "List"], a: 0, e: "Map associates each key with a value; keys are unique." },
  { topic: "Module 4 · Advanced Java", q: "Which interface should a class implement to support Java object serialization?", o: ["Serializable", "Comparable", "Runnable", "Readable"], a: 0, e: "Serializable marks a class as eligible for the standard object serialization mechanism." },
  { topic: "Module 5 · Design Principles", q: "In a UML class diagram, what does `0..*` mean?", o: ["Zero or more related objects", "Exactly one object", "Zero or one object", "At least one object"], a: 0, e: "Multiplicity 0..* (or *) means there may be no related objects or many." },
  { topic: "Module 5 · Design Principles", q: "A House creates and owns its Rooms, whose lifecycle depends on the House. Which relationship fits?", o: ["Composition", "Aggregation", "Dependency", "Inheritance"], a: 0, e: "Composition models strong ownership of parts by a whole." },
  { topic: "Module 5 · Design Principles", q: "What is the goal of refactoring?", o: ["Improve internal structure while preserving observable behavior", "Add features by changing every caller", "Delete all abstractions", "Make the code longer for clarity"], a: 0, e: "Refactoring improves code structure without changing what the program does." },
  { topic: "Module 5 · Design Principles", q: "What does DRY encourage?", o: ["Avoid duplicating the same knowledge or logic", "Write every method twice", "Use inheritance for every relationship", "Remove all comments"], a: 0, e: "DRY means Don't Repeat Yourself: keep each piece of knowledge in one clear place." },
  { topic: "Module 5 · Design Principles", q: "Which design is a KISS violation?", o: ["Adding needless layers and abstractions to a simple task", "Choosing a straightforward solution", "Naming a method clearly", "Removing duplicate code"], a: 0, e: "KISS encourages keeping a solution as simple as the problem allows." },
  { topic: "Module 5 · Design Principles", q: "A class changes for unrelated reasons because it handles billing and report formatting. Which principle is most directly violated?", o: ["Single Responsibility Principle", "Liskov Substitution Principle", "Interface Segregation Principle", "Dependency Inversion Principle"], a: 0, e: "SRP asks a class to have one cohesive responsibility and one main reason to change." },
    // Additional OOP Questions
  { topic: "OOP · Encapsulation", q: "Why should fields usually be declared private?", o: ["To control how data is accessed and modified", "To make objects load faster", "To prevent constructors from running", "To allow every class to access them"], a: 0, e: "Private fields protect an object's internal state and allow controlled access through methods." },

  { topic: "OOP · Encapsulation", q: "What is a getter method used for?", o: ["To retrieve the value of a field", "To delete an object", "To override a constructor", "To create a subclass"], a: 0, e: "A getter provides controlled access to an object's field." },

  { topic: "OOP · Encapsulation", q: "What is a setter method commonly used for?", o: ["To modify a field with possible validation", "To destroy an instance", "To create an interface", "To inherit a method"], a: 0, e: "A setter allows controlled modification and validation of an object's state." },

  { topic: "OOP · Inheritance", q: "Which keyword allows a Java class to inherit another class?", o: ["extends", "implements", "inherits", "super"], a: 0, e: "The extends keyword establishes inheritance between classes." },

  { topic: "OOP · Inheritance", q: "If class Cat extends class Animal, what is Cat?", o: ["Subclass", "Superclass", "Interface", "Package"], a: 0, e: "Cat is the subclass, while Animal is its superclass." },

  { topic: "OOP · Inheritance", q: "What does the super keyword refer to?", o: ["The immediate parent class", "The current object", "The child class", "The main method"], a: 0, e: "super accesses superclass members and constructors." },

  { topic: "OOP · Inheritance", q: "Which constructor executes first when a subclass object is created?", o: ["Superclass constructor", "Subclass constructor", "Static method", "Finalizer"], a: 0, e: "Java invokes the superclass constructor before completing the subclass constructor." },

  { topic: "OOP · Polymorphism", q: "Which is an example of runtime polymorphism?", o: ["Method overriding", "Method overloading", "Variable declaration", "Constructor overloading"], a: 0, e: "Overriding allows the actual object's type to determine which implementation runs at runtime." },

  { topic: "OOP · Polymorphism", q: "What is compile-time polymorphism in Java commonly achieved through?", o: ["Method overloading", "Method overriding", "Inheritance only", "Exception handling"], a: 0, e: "The compiler selects an overloaded method based on the arguments and parameter types." },

  { topic: "OOP · Polymorphism", q: "What is upcasting?", o: ["Assigning a subclass object to a superclass reference", "Converting a string into an integer", "Creating multiple constructors", "Converting a parent into an unrelated class"], a: 0, e: "Upcasting treats a subclass object as an instance of its superclass." },

  { topic: "OOP · Abstraction", q: "Which keyword declares an abstract class in Java?", o: ["abstract", "interface", "virtual", "static"], a: 0, e: "The abstract keyword declares a class that cannot be instantiated directly." },

  { topic: "OOP · Abstraction", q: "Can an abstract class contain ordinary methods with implementations?", o: ["Yes", "No", "Only if all methods are static", "Only if it implements an interface"], a: 0, e: "Abstract classes can contain both abstract methods and fully implemented methods." },

  { topic: "OOP · Abstraction", q: "Can you directly create an object of an abstract class?", o: ["No", "Yes, always", "Only inside main()", "Only through a static method"], a: 0, e: "An abstract class cannot be instantiated directly. A concrete subclass can be instantiated." },

  { topic: "OOP · Interfaces", q: "Can a Java class implement multiple interfaces?", o: ["Yes", "No", "Only two", "Only if they have no methods"], a: 0, e: "Java allows a class to implement multiple interfaces." },

  { topic: "OOP · Interfaces", q: "What happens when a concrete class implements an interface but does not implement all required abstract methods?", o: ["It must be declared abstract or provide the missing implementations", "Java automatically creates the methods", "The interface is deleted", "The program always runs normally"], a: 0, e: "A concrete class must fulfill its interface contract." },

  { topic: "OOP · Constructors", q: "What is a default constructor?", o: ["A no-argument constructor supplied by the compiler when no constructor is declared", "A constructor that always returns null", "A constructor inherited from the parent", "A static method"], a: 0, e: "Java supplies a default no-argument constructor only when the class declares no constructor." },

  { topic: "OOP · Constructors", q: "Can constructors have different parameter lists in the same class?", o: ["Yes, through constructor overloading", "No, only one constructor is allowed", "Only when they are static", "Only when they return an object"], a: 0, e: "Constructor overloading allows multiple ways to initialize an object." },

  { topic: "OOP · Constructors", q: "Does a constructor have a return type?", o: ["No", "Yes, void", "Yes, int", "Yes, the class name as a return type"], a: 0, e: "A constructor has the same name as its class and does not declare a return type." },

  { topic: "OOP · Relationships", q: "What is aggregation?", o: ["A weak has-a relationship where the contained object can exist independently", "A strong inheritance relationship", "A method that returns an object", "A class implementing another class"], a: 0, e: "Aggregation represents a has-a relationship without strict ownership of the contained object's lifecycle." },

  { topic: "OOP · Relationships", q: "Which relationship represents an is-a relationship?", o: ["Inheritance", "Composition", "Aggregation", "Dependency"], a: 0, e: "Inheritance models an is-a relationship, such as Dog is an Animal." },

  { topic: "OOP · Relationships", q: "A Department has several Professors, and those Professors can exist even if the Department is removed. Which relationship is most appropriate?", o: ["Aggregation", "Composition", "Inheritance", "Method overriding"], a: 0, e: "Aggregation fits because the Professor objects can exist independently of the Department." },

  { topic: "OOP · Method Behavior", q: "Can a private method be overridden by a subclass?", o: ["No", "Yes, always", "Only if it is static", "Only if the subclass is abstract"], a: 0, e: "Private methods are not inherited and therefore cannot be overridden." },

  { topic: "OOP · Method Behavior", q: "Can a static method be overridden in the same way as an instance method?", o: ["No, static methods are hidden rather than overridden", "Yes, always", "Only when the class is abstract", "Only when the method is private"], a: 0, e: "Static method binding is based on the reference type; static methods are hidden, not dynamically overridden." },

  { topic: "OOP · Method Behavior", q: "What does the @Override annotation do?", o: ["Tells the compiler that a method is intended to override an inherited method", "Creates a new object", "Makes a method private", "Prevents inheritance"], a: 0, e: "The annotation helps catch mistakes when a method does not correctly override a superclass or interface method." },

  { topic: "OOP · Object Class", q: "Which class is the root superclass of Java classes?", o: ["Object", "System", "Class", "Main"], a: 0, e: "The java.lang.Object class is the root of the Java class hierarchy." },

  { topic: "OOP · Object Class", q: "What is the purpose of the toString() method?", o: ["To provide a string representation of an object", "To compare two objects", "To delete an object", "To create a constructor"], a: 0, e: "toString() returns a string representation and can be overridden to provide meaningful object information." },

  { topic: "OOP · Object Class", q: "What does equals() commonly determine when properly overridden?", o: ["Logical equality between two objects", "Whether two variables have the same name", "Whether an object is abstract", "Whether a class has a constructor"], a: 0, e: "equals() can compare the logical contents of objects rather than just their references." },

  { topic: "OOP · Design", q: "What is high cohesion?", o: ["A class has closely related responsibilities", "A class depends on every other class", "A class contains unrelated methods", "A class has no methods"], a: 0, e: "High cohesion means a class has a focused and well-defined responsibility." },

  { topic: "OOP · Design", q: "What is loose coupling?", o: ["Components have minimal dependencies on each other's internal details", "Every class directly accesses every other class", "All fields are public", "All methods are static"], a: 0, e: "Loose coupling makes components easier to modify, test, and maintain independently." },

  { topic: "OOP · Design", q: "Why should you avoid using inheritance just to reuse a few methods?", o: ["It can create an incorrect is-a relationship and unnecessary dependency", "Inheritance is always slower", "Java does not support method reuse", "Subclasses cannot access inherited methods"], a: 0, e: "Inheritance should represent a valid is-a relationship. Composition may be a better reuse mechanism." },
];

export const ROASTS = {
  savage: {
    good: [
      "AY WOW. Tama?! May nag-review pala. Akala ko puro attendance lang ang ambag mo.",
      "Correct! I-save mo 'yang moment. Baka hindi na maulit this semester.",
      "Grabe, may laman ang utak today. Hindi lang pala pang-display.",
      "Tama ka! Pakisabi sa groupmates mo na may ambag ka na rin.",
      "Main character ka muna ngayon. Bukas balik supporting character.",
      "Correct! The compiler is proud. Your previous outputs are still under investigation.",
      "Aba, may intellectual activity! Akala ko naka-leave na brain cells mo.",
      "Tama! Screenshot mo na. Pang-evidence sa future generations.",
      "You got it right! Character development is real.",
      "Ayos! May progress. Hindi na puro emotional damage ang performance."
    ],

    bad: [
      "Beh, ang layo. Hindi ka nagkamali ng sagot, nagkamali ka ng course.",
      "MALI. Kahit yung maling option nahihiya na sa'yo.",
      "Nag-aral ka ba o nag-open lang ng PDF para masabing may effort?",
      "Yung sagot mo parang group project mo: walang direction, walang accountability.",
      "Ang confidence mo pang-defense, pero yung sagot mo pang-absent.",
      "Hindi ito raffle, beh. Hindi lahat ng choices kailangan mong subukan.",
      "Your logic just filed a resignation letter. Hindi na niya kaya.",
      "Kung programming language ka, ikaw yung syntax error na hindi mahanap kahit may underline na.",
      "Pati compiler napagod nang intindihin ang reasoning mo.",
      "Beh, hindi porket familiar yung word, yun na agad ang sagot.",
      "Yung utak mo ba naka-comment out? Kasi walang execution.",
      "Ang answer mo may potential. Potential maging example ng what not to do.",
      "Kung may award sa confidently incorrect, may scholarship ka na sana.",
      "Hindi ka bobo, beh. Pero yung decision-making mo ngayon, may sariling problema.",
      "Yung logic mo parang Wi-Fi sa basement: technically connected, pero walang silbi.",
      "Nag-inherit ka yata ng bad decisions. Wala man lang override.",
      "Encapsulation ang topic pero pati common sense mo naka-private.",
      "Polymorphism: maraming forms. Ikaw: maraming paraan para magkamali.",
      "Abstraction: tinatago ang implementation. Ikaw: tinatago pati understanding.",
      "Inheritance: nagmana ka ng knowledge. Kaso mukhang hindi successful ang transfer.",
      "Method overloading? Hindi. Brain overloading ang nangyari sa'yo.",
      "Your answer is so wrong, even the distractors want to disown it.",
      "Kung thesis defense ito, nasa introduction ka pa lang, bagsak ka na.",
      "Hindi ito group activity. Hindi puwedeng umasa ka sa katabing may alam.",
      "Yung answer mo parang code na galing sa random tutorial: gumagana sa imagination mo lang.",
      "May semicolon nga ang code mo, pero walang sense ang sagot mo.",
      "Ang bilis mong pumili. Sana ganyan ka rin kabilis magbasa ng instructions.",
      "Pati stack overflow may mas magandang explanation kaysa sa reasoning mo.",
      "Kung object ka, ang methods mo puro excuse at ang fields mo puro problema.",
      "Hindi ka dapat mag-favor ng composition over inheritance. Mag-favor ka muna ng reading comprehension.",
      "Your answer is a perfect example of why we need exception handling.",
      "Beh, nagtanong ako ng OOP, hindi ng personal opinion mo.",
      "Hindi lahat ng may keyword na 'class' ay automatic correct. Basahin mo muna.",
      "Yung confidence mo naka-public, pero yung knowledge mo naka-private.",
      "Kung may garbage collector sa classroom, baka ikaw ang unang ma-collect sa dami ng basura ng sagot.",
      "Your brain has multiple threads, pero lahat naka-deadlock.",
      "Ang output mo ay undefined. Pati future mo nagtataka.",
      "May constructor ka nga, pero parang walang initialization ng knowledge.",
      "Your performance is not an exception. It's the entire problem.",
      "Beh, kahit yung sample code sa PowerPoint mas prepared pa kaysa sa'yo.",
      "Mali na nga, parang proud ka pa. Confidence without competence is a dangerous combination."
    ],

    timeout: [
      "TIME'S UP! Mas mabilis pa mag-load ang CvSU portal kaysa sa decision-making mo.",
      "Beh, tapos na ang timer. Hindi ito thesis na puwedeng i-extend dahil hindi ka ready.",
      "Twenty seconds na, wala pa rin? Nag-hang ba yung brain mo?",
      "Timeout! Pati deadline hindi ka na hinintay. Relate much?",
      "Ang tagal mong sumagot, akala ko nagre-research ka. Nag-iisip ka lang pala kung manghuhula ka.",
      "Time's up. Your brain requested an extension, but the system rejected it.",
      "Hindi ka naubusan ng oras. Naubusan ka ng idea.",
      "Timer ended. Sana yung review mo hindi rin nag-end bago nagsimula."
    ],

    streakBad: [
      "Wrong ka na naman. Beh, hindi na ito bad luck. May pattern na tayo.",
      "Consecutive mistakes. Consistency is important, pero hindi ganito.",
      "Puro mali. Pati wrong answers mo may attendance perfect.",
      "Sablay na naman. Baka kailangan mo nang i-review pati pangalan ng subject.",
      "Sunod-sunod ang sablay. Kung inheritance ito, namana mo lahat ng maling concept.",
      "Hindi ka naglalaro ng bingo para kolektahin lahat ng choices.",
      "The only thing you're successfully implementing is failure.",
      "Puro sablay. Pati calculator ayaw nang makisali sa computation ng score mo."
    ]
  },
  streakGood: [
    "Sunod-sunod ang tama. Grabe, may character development pala.",
    "Straight na tama. Screenshot mo na bago bumalik ang dating ikaw.",
    "Tama ka na naman. Main character moment—sana may season two.",
    "Correct ulit. Pati groupmates mo napa-double take.",
  ],
};

export const ENDINGS = [
  [100, [
    "100%. Aba, may utak pala sa likod ng confidence. Huwag magyabang; baka lucky build lang.",
    "Perfect score! I-save mo 'yang screenshot. Kailangan ng GC ng proof na may ambag ka.",
    "Perfect? Ikaw na muna mag-code review. Pero huwag i-approve ang sarili mong PR, ha.",
    "Main character ka today. Bukas balik ka sa supporting role kasama ng mga maling sagot mo.",
  ]],
  [80, [
    "80%. Ayos, kaya mo pala kapag hindi ka nanghuhula gamit ang vibes.",
    "Good score. Pwede ka nang mag-code review—may supervision pa rin, siyempre.",
    "May alam ka pala. Ipaalam sa groupmates mo; baka akala nila puro seen ka lang.",
    "Not bad. Your brain cells finally held a meeting and one of them had an agenda.",
  ]],
  [55, [
    "55%. Passing object, barely. Design pattern mo yata 'bahala na si compiler.'",
    "Pasang-awa energy. Technically working, pero walang matinong developer ang magme-merge nito.",
    "You passed by a thread. Parang code na gumagana lang sa laptop ng gumawa.",
    "55%. May foundation ka na—foundation ng remedial review. Balikan ang notes, beh.",
  ]],
  [30, [
    "30%. Hindi ka bumagsak; nag-demo ka lang ng failure in production.",
    "Olats, beh. Yung grade mo mas kailangan ng refactoring kaysa sa sample code.",
    "Your score needs more fixing than a class with public fields and no validation.",
    "30%. May potential ka, pero tinatago yata kasama ng understanding mo.",
  ]],
  [0, [
    "Zero. You selected every wrong answer like it was your assigned role in a group project.",
    "0%. Ikaw at ang tamang sagot may no-contact order na yata.",
    "Not one correct answer. Kahit random number generator napagod nang tulungan ka.",
    "Zero? Grabe, pati wrong answers mo tightly coupled sa failure. Mag-review bago sumalang ulit.",
  ]],
];
