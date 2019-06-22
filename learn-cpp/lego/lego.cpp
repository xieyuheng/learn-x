#include <vector>
#include <functional>
#include <iostream>
#include <string>
#include <sstream>
#include <cassert>

/// Parser for the Akuna Lego Unit input file
//
// When the process() method is called, this class read from
// stdin and call callbacks for each unit, input, connection, and
// value.
class input_parser {
public:
    /// Register the callback for each UNIT in the input file.
    /// The first parameter is the "unit-name", the second parameter is the "unit-type".
    /// E.g:
    ///    a := sum
    /// We would call unit_callback_("a", "sum")
    ///
    void register_unit_callback(std::function<void(std::string, std::string)> cb)
    {
        unit_callback_ = cb;
    }

    /// Register the callback for the INPUTS line in the input file
    ///
    /// The parameter tells how many input ports there are.
    /// E.g:
    ///    INPUTS: 2
    /// We would call input_callback_(2)
    void register_input_callback(std::function<void(int)> cb)
    {
        input_callback_ = cb;
    }

    /// Register the callback for each CONNECTION in the input file
    ///
    /// The first 3 parameters tell you the "from" side,
    /// the last 3 parameters tell you the "to" side.
    ///
    /// For each three parameter group:
    ///  - The first is the unit name, "input" or "result"
    ///  - The second is "in", "out" or "" (empty)
    ///  - The third is port number (could be empty string), e.g. "0", "1", or "".
    /// Example 1:
    ///   input/0 -- a/in/0
    ///   =>   connection_callback_("input", "", "0", "a", "in", "0")
    /// Example 2:
    ///   a/out/0 -- result
    ///   =>   connection_callback_("a", "out", 0, "result", "", "")
    /// Example 3:
    ///   a/out/3 -- b/in/1
    ///   =>   connection_callback_("a", "out", "3", "b", "in", "1")
    ///
    void register_connection_callback(std::function<void(std::string, std::string, std::string, std::string, std::string, std::string)> cb)
    {
        connection_callback_ = cb;
    }

    /// Register the callback for each VALUE in the input file
    ///
    /// The first parameter is always "input" :)
    /// The second parameter is the input port number in string. e.g. "0", "1"
    /// The third parameter is the value number in string. e.g. "999"
    /// E.g:
    ///    input/0 := 3
    /// We would call value_callback_("input", "0", "3")
    void register_value_callback(std::function<void(std::string, std::string, std::string)> cb)
    {
        value_callback_ = cb;
    }

    void
    process()
    {
        // process the UNITS line
        int units_num = get_section_title_line();

        // handle the expected number of units
        for (int i = 0; i < units_num; i++) {
            std::string name, type;
            get_section_internal_line(name, type);
            if (unit_callback_)
                unit_callback_(name, type);
        }

        // process the INPUTS line
        int inputs_num = get_section_title_line();
        if (input_callback_)
            input_callback_(inputs_num);

        // process the CONNECTIONS line
        int connections_num = get_section_title_line();

        // handle the expected number of connections
        for (int i = 0; i < connections_num; i++) {
            std::string from, to;
            get_section_internal_line(from, to);
            assert(from != "result");
            std::vector<std::string> from_strs = split(from, '/');
            assert(from_strs.size() >= 2);
            std::vector<std::string> to_strs = split(to, '/');
            assert(from_strs.size() >= 1);

            // the first parameter is from_strs[0]
            std::string second = from_strs[0] == "input" ? "" : from_strs[1];
            std::string third = from_strs[0] == "input" ? from_strs[1] : from_strs[2];

            std::string fifth = "";
            std::string sixth = "";
            if (to_strs[0] == "input")
                {
                    sixth = to_strs[1];
                }
            else if (to_strs[0] != "result")
                {
                    fifth = to_strs[1];
                    sixth = to_strs[2];
                }

            if (connection_callback_)
                connection_callback_(from_strs[0], second, third,
                                     to_strs[0], fifth, sixth);
        }

        // process the VALUES line
        int values_num = get_section_title_line();

        // handle the expected number of values
        for (int i = 0; i < values_num; i++) {
            std::string input, value;
            get_section_internal_line(input, value);
            std::vector<std::string> strs = split(input, '/');
            assert(strs.size() == 2);
            if (value_callback_)
                value_callback_(strs[0], strs[1], value);
        }
    }

private:
    template<typename Out>
    void split(const std::string &s, char delim, Out result)
    {
        std::stringstream ss;
        ss.str(s);
        std::string item;
        while (std::getline(ss, item, delim))
        {
            *(result++) = item;
        }
    }

    // split a string an a delimiter and return a vector of the results
    std::vector<std::string> split(const std::string &s, char delim)
    {
        std::vector<std::string> elems;
        split(s, delim, std::back_inserter(elems));
        return elems;
    }

    // read a line from stdin and return the number in the second token
    int get_section_title_line()
    {
        std::string line;
        std::getline(std::cin, line);
        std::vector<std::string> words = split(line, ' ');
        assert(words.size() == 2);
        return atoi(words[1].c_str());
    }

    // read a line from stdin and return the first and third token
    void get_section_internal_line(std::string& a, std::string& b)
    {
        std::string line;
        std::getline(std::cin, line);
        std::vector<std::string> words = split(line, ' ');
        assert(words.size() == 3);
        a = words[0];
        b = words[2];
    }

private:
    std::function<void(std::string, std::string)> unit_callback_;

    std::function<void(int n)> input_callback_;

    std::function<void(std::string, std::string, std::string, std::string, std::string, std::string)> connection_callback_;

    std::function<void(std::string, std::string, std::string)> value_callback_;
};



// Solution

// - Notes
//   - I assert the program out here, just as you did.
//   - I am new to c++ (only two weeks),
//     I have not established my c++ coding style yet.
//   - I am using `scalable-c` coding style of the ZMQ Community.
//       :: https://hintjens.gitbooks.io/scalable-c/content/chapter2.html
//     I will switch to your team's coding style, please do not worry about this :)

#include <map>

using namespace std;

using name_t = string;

struct port_t
{
    bool active_p;
    int value;
    port_t ();
};

port_t::port_t ()
{
    this->active_p = false;
}

void
port_print (port_t *port)
{
    if (port->active_p)
        cout << port->value;
    else
        cout << "_";
}

void
port_vector_print (vector<port_t *> *port_vector)
{
    for (auto &port: *port_vector) {
        port_print (port);
        cout << " ";
    }
}

enum side_t { IN_SIDE, OUT_SIDE };

struct unit_t
{
    size_t input_arity;
    size_t output_arity;
    vector<port_t *> *input_vector;
    vector<port_t *> *output_vector;
    port_t * probe (side_t side, size_t index);
    virtual void refresh ();
    virtual void print ();
};

port_t *
unit_t::probe (side_t side, size_t index)
{
    vector<port_t *> &input_vector = *(this->input_vector);
    vector<port_t *> &output_vector = *(this->output_vector);
    if (side == IN_SIDE) {
        assert (index < this->input_arity);
        return input_vector [index];
    }
    else if (side == OUT_SIDE) {
        assert (index < this->output_arity);
        return output_vector [index];
    }
    else {
        cout << "fatal error: probing an unknown side!\n";
        exit (1);
    }
}

void
unit_t::refresh ()
{
    cout << "fatal error: refreshing an unknown unit!\n";
    exit (1);
}

void
unit_t::print ()
{
    cout << "fatal error: printing an unknown unit!\n";
    exit (1);
}

struct sum_unit_t: unit_t
{
    sum_unit_t ();
    void refresh ();
    void print ();
};

sum_unit_t::sum_unit_t ()
{
    this->input_arity = 2;
    this->output_arity = 1;

    this->input_vector = new vector<port_t *>;
    this->input_vector->push_back (new port_t);
    this->input_vector->push_back (new port_t);

    this->output_vector = new vector<port_t *>;
    this->output_vector->push_back (new port_t);
}

void
sum_unit_t::refresh ()
{
    vector<port_t *> &input_vector = *(this->input_vector);
    vector<port_t *> &output_vector = *(this->output_vector);
    if (input_vector[0]->active_p and input_vector[1]->active_p) {
        output_vector[0]->active_p = true;
        output_vector[0]->value =
            input_vector[0]->value +
            input_vector[1]->value;
    }
}

void
sum_unit_t::print ()
{
    cout << "{ sum ";
    port_vector_print (this->input_vector);
    cout << "-> ";
    port_vector_print (this->output_vector);
    cout << "}";
}

struct negate_unit_t: unit_t
{
    negate_unit_t ();
    void refresh ();
    void print ();
};

negate_unit_t::negate_unit_t ()
{
    this->input_arity = 1;
    this->output_arity = 1;

    this->input_vector = new vector<port_t *>;
    this->input_vector->push_back (new port_t);
    this->input_vector->push_back (new port_t);

    this->output_vector = new vector<port_t *>;
    this->output_vector->push_back (new port_t);
}

void
negate_unit_t::refresh ()
{
    vector<port_t *> &input_vector = *(this->input_vector);
    vector<port_t *> &output_vector = *(this->output_vector);
    if (input_vector[0]->active_p) {
        output_vector[0]->active_p = true;
        output_vector[0]->value = - input_vector[0]->value;
    }
}

void
negate_unit_t::print ()
{
    cout << "{ negate ";
    port_vector_print (this->input_vector);
    cout << "-> ";
    port_vector_print (this->output_vector);
    cout << "}";
}



struct max_unit_t: unit_t
{
    max_unit_t ();
    void refresh ();
    void print ();
};

max_unit_t::max_unit_t ()
{
    this->input_arity = 2;
    this->output_arity = 1;

    this->input_vector = new vector<port_t *>;
    this->input_vector->push_back (new port_t);
    this->input_vector->push_back (new port_t);

    this->output_vector = new vector<port_t *>;
    this->output_vector->push_back (new port_t);
}

void
max_unit_t::refresh ()
{
    vector<port_t *> &input_vector = *(this->input_vector);
    vector<port_t *> &output_vector = *(this->output_vector);
    if (input_vector[0]->active_p and input_vector[1]->active_p) {
        output_vector[0]->active_p = true;
        output_vector[0]->value =
            max (input_vector[0]->value,
                 input_vector[1]->value);
    }
}

void
max_unit_t::print ()
{
    cout << "{ max ";
    port_vector_print (this->input_vector);
    cout << "-> ";
    port_vector_print (this->output_vector);
    cout << "}";
}

struct min_unit_t: unit_t
{
    min_unit_t ();
    void refresh ();
    void print ();
};

min_unit_t::min_unit_t ()
{
    this->input_arity = 2;
    this->output_arity = 1;

    this->input_vector = new vector<port_t *>;
    this->input_vector->push_back (new port_t);
    this->input_vector->push_back (new port_t);

    this->output_vector = new vector<port_t *>;
    this->output_vector->push_back (new port_t);
}

void
min_unit_t::refresh ()
{
    vector<port_t *> &input_vector = *(this->input_vector);
    vector<port_t *> &output_vector = *(this->output_vector);
    if (input_vector[0]->active_p and input_vector[1]->active_p) {
        output_vector[0]->active_p = true;
        output_vector[0]->value =
            min (input_vector[0]->value,
                 input_vector[1]->value);
    }
}

void
min_unit_t::print ()
{
    cout << "{ min ";
    port_vector_print (this->input_vector);
    cout << "-> ";
    port_vector_print (this->output_vector);
    cout << "}";
}


struct mul_unit_t: unit_t
{
    mul_unit_t ();
    void refresh ();
    void print ();
};

mul_unit_t::mul_unit_t ()
{
    this->input_arity = 2;
    this->output_arity = 1;

    this->input_vector = new vector<port_t *>;
    this->input_vector->push_back (new port_t);
    this->input_vector->push_back (new port_t);

    this->output_vector = new vector<port_t *>;
    this->output_vector->push_back (new port_t);
}

void
mul_unit_t::refresh ()
{
    vector<port_t *> &input_vector = *(this->input_vector);
    vector<port_t *> &output_vector = *(this->output_vector);
    if (input_vector[0]->active_p and input_vector[1]->active_p) {
        output_vector[0]->active_p = true;
        output_vector[0]->value =
            input_vector[0]->value *
            input_vector[1]->value;
    }
}

void
mul_unit_t::print ()
{
    cout << "{ mul ";
    port_vector_print (this->input_vector);
    cout << "-> ";
    port_vector_print (this->output_vector);
    cout << "}";
}


// I implement `input` and `result` as special unit.

struct result_unit_t: unit_t
{
    result_unit_t ();
    void refresh ();
    void print ();
};

result_unit_t::result_unit_t ()
{
    this->input_arity = 1;
    this->output_arity = 1;

    this->input_vector = new vector<port_t *>;
    this->input_vector->push_back (new port_t);

    this->output_vector = new vector<port_t *>;
    this->output_vector->push_back (new port_t);
}

void
result_unit_t::refresh ()
{
    vector<port_t *> &input_vector = *(this->input_vector);
    vector<port_t *> &output_vector = *(this->output_vector);
    if (input_vector[0]->active_p) {
        output_vector[0]->active_p = input_vector[0]->active_p;
        output_vector[0]->value = input_vector[0]->value;
    }
}

void
result_unit_t::print ()
{
    cout << "{ result ";
    port_vector_print (this->input_vector);
    cout << "-> ";
    port_vector_print (this->output_vector);
    cout << "}";
}

struct input_unit_t: unit_t
{
    input_unit_t (size_t arity);
    void refresh ();
    void print ();
};

input_unit_t::input_unit_t (size_t arity)
{
    this->input_arity = arity;
    this->output_arity = arity;

    this->input_vector = new vector<port_t *>;
    this->output_vector = new vector<port_t *>;

    for (int i = 0; i < arity; i++) {
        this->input_vector->push_back (new port_t);
        this->output_vector->push_back (new port_t);
    }
}

void
input_unit_t::refresh ()
{
    vector<port_t *> &input_vector = *(this->input_vector);
    vector<port_t *> &output_vector = *(this->output_vector);
    for (int i = 0; i < this->input_arity; i++) {
        output_vector[0]->active_p = input_vector[0]->active_p;
        output_vector[0]->value = input_vector[0]->value;
    }
}

void
input_unit_t::print ()
{
    cout << "{ input ";
    port_vector_print (this->input_vector);
    cout << "-> ";
    port_vector_print (this->output_vector);
    cout << "}";
}

struct label_t
{
    name_t name;
    side_t side;
    size_t index;
};

struct connection_t
{
    label_t start_label;
    label_t end_label;
};

using unit_map_t = map<name_t, unit_t *>;

using connection_vector_t = vector<connection_t>;

struct lego_t
{
    // Due to the design of the language,
    //   "input" and "result" are reserved names.
    unit_map_t *unit_map;
    connection_vector_t *connection_vector;
    lego_t ();
    void refresh ();
    void report ();
};

lego_t::lego_t ()
{
    this->unit_map = new unit_map_t;
    this->connection_vector = new connection_vector_t;
}

void
lego_t::refresh ()
{
    for (auto &conn: *connection_vector) {
        auto lhs = unit_map->find (conn.start_label.name);
        auto rhs = unit_map->find (conn.end_label.name);
        assert (lhs != unit_map->end ());
        assert (rhs != unit_map->end ());
        unit_t *start_unit = lhs->second;
        unit_t *end_unit = rhs->second;
        port_t *start_port = start_unit->probe (conn.start_label.side,
                                                conn.start_label.index);
        port_t *end_port = end_unit->probe (conn.end_label.side,
                                            conn.end_label.index);
        end_port->active_p = start_port->active_p;
        end_port->value = start_port->value;
        end_unit->refresh ();
    }
}

void
unit_map_report (unit_map_t *unit_map)
{
    cout << "  - unit_map\n";
    for (auto &kv: *(unit_map)) {
        cout << "    " << kv.first << " : ";
        unit_t *unit = kv.second;
        unit->print ();
        cout << "\n";
    }
}



void
label_print (label_t label)
{
    cout << "(";
    cout << label.name;
    cout << " ";
    if (label.side == IN_SIDE) cout << "in";
    else if (label.side == OUT_SIDE) cout << "out";
    else cout << "???";
    cout << " ";
    cout << label.index;
    cout << ")";
}

void
connection_vector_report (connection_vector_t *connection_vector)
{
    cout << "  - connection_vector\n";
    for (auto &conn: *connection_vector) {
        cout << "    ";
        label_print (conn.start_label);
        cout << " <-> ";
        label_print (conn.end_label);
        cout << "\n";
    }
}

void
lego_t::report ()
{
    cout << "\n";
    cout << "- lego\n";
    unit_map_report (this->unit_map);
    connection_vector_report (this->connection_vector);
    cout << "\n";
}

// I have to use a global object,
//   because of the design of your callback function.
lego_t * lego = new lego_t;

unit_t *
get_unit (string unit_type)
{
    if (unit_type == "sum") return new sum_unit_t;
    if (unit_type == "negate") return new negate_unit_t;
    if (unit_type == "max") return new max_unit_t;
    if (unit_type == "min") return new min_unit_t;
    if (unit_type == "mul") return new mul_unit_t;
    cout << "fatal error: getting an unknown unit_type : "
         << unit_type
         << "\n";
    exit (1);
}

void
process_unit (string unit_name, string unit_type)
{
    lego->unit_map->insert
        (pair<name_t, unit_t *>
         (unit_name, get_unit (unit_type)));
}

void
process_input (int arity)
{
    input_unit_t *input_unit = new input_unit_t (arity);
    lego->unit_map->insert
        (pair<name_t, unit_t *> ("input", input_unit));
}

side_t get_side (string name, string side_string)
{
    if (name == "result") return IN_SIDE;
    if (name == "input") return OUT_SIDE;
    if (side_string == "in") return IN_SIDE;
    if (side_string == "out") return OUT_SIDE;
    else {
        cout << "fatal error: getting an unknown side : "
             << side_string
             << "\n";
        exit (1);
    }
}

label_t
get_label (string name,
           string side_string,
           string index_string)
{
    size_t index = 0;
    if (name != "result")
        index = static_cast<size_t> (stoi (index_string));
    label_t label =
        label_t { name,
                  get_side (name, side_string),
                  index };
    return label;
}

void
process_connection (string start_name,
                    string start_side_string,
                    string start_index_string,
                    string end_name,
                    string end_side_string,
                    string end_index_string)
{
    label_t start_label =
        get_label (start_name,
                   start_side_string,
                   start_index_string);
    label_t end_label =
        get_label (end_name,
                   end_side_string,
                   end_index_string);
    connection_t conn = connection_t { start_label, end_label };
    lego->connection_vector->push_back (conn);
}

void
process_value (string always_input,
               string index_string,
               string value_string)
{
    assert (always_input == "input");

    size_t index = static_cast<size_t> (stoi (index_string));
    int value = (stoi (value_string));

    auto found_input_unit = lego->unit_map->find ("input");
    assert (found_input_unit != lego->unit_map->end ());
    unit_t *input_unit = found_input_unit->second;
    port_t *input_start_port = input_unit->probe (IN_SIDE, index);
    input_start_port->active_p = true;
    input_start_port->value = value;
    port_t *input_end_port = input_unit->probe (OUT_SIDE, index);
    input_end_port->active_p = true;
    input_end_port->value = value;

    lego->refresh ();
    // uncomment the following line to have some fun ^-^/
    // lego->report ();

    auto found_result_unit = lego->unit_map->find ("result");
    assert (found_result_unit != lego->unit_map->end ());
    unit_t *result_unit = found_result_unit->second;
    port_t *result_end_port = result_unit->probe (OUT_SIDE, 0);

    if (result_end_port->active_p)
        cout << result_end_port->value
             << "\n";
}

int
main ()
{
    lego->unit_map->insert
        (pair<name_t, unit_t *> ("result", new result_unit_t));
    input_parser little_parser = input_parser ();
    little_parser.register_unit_callback (process_unit);
    little_parser.register_input_callback (process_input);
    little_parser.register_connection_callback (process_connection);
    little_parser.register_value_callback (process_value);
    little_parser.process ();
    return 0;
}
