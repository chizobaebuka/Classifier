const input = [
    {
        name: 'Hendrick',
        dob: '1853-07-18T00:00:00.000Z',
        regNo: '041',
    },
    {
        name: 'Albert',
        dob: '1879-03-14T00:00:00.000Z',
        regNo: '033',
    },
    {
        name: 'Marie',
        dob: '1867-11-07T00:00:00.000Z',
        regNo: '024',
    },
    {
        name: 'Neils',
        dob: '1885-10-07T00:00:00.000Z',
        regNo: '02',
    },
    {
        name: 'Max',
        dob: '1858-04-23T00:00:00.000Z',
        regNo: '014',
    },
    {
        name: 'Erwin',
        dob: '1887-08-12T00:00:00.000Z',
        regNo: '09',
    },
    {
        name: 'Auguste',
        dob: '1884-01-28T00:00:00.000Z',
        regNo: '08',
    },
    {
        name: 'Karl',
        dob: '1901-12-05T00:00:00.000Z',
        regNo: '120',
    },
    {
        name: 'Louis',
        dob: '1892-08-15T00:00:00.000Z',
        regNo: '022',
    },
    {
        name: 'Arthur',
        dob: '1892-09-10T00:00:00.000Z',
        regNo: '321',
    },
    {
        name: 'Paul',
        dob: '1902-08-08T00:00:00.000Z',
        regNo: '055',
    },
    {
        name: 'William',
        dob: '1890-03-31T00:00:00.000Z',
        regNo: '013',
    },
    {
        name: 'Owen',
        dob: '1879-04-26T00:00:00.000Z',
        regNo: '052',
    },
    {
        name: 'Martin',
        dob: '1871-02-15T00:00:00.000Z',
        regNo: '063',
    },
    {
        name: 'Guye',
        dob: '1866-10-15T00:00:00.000Z',
        regNo: '084',
    },
    {
        name: 'Charles',
        dob: '1868-02-14T00:00:00.000Z',
        regNo: '091',
    },
];


function classifier(input) {
    const students = input.slice(); // Create a copy of the input array

    students.sort((a, b) => {
        return new Date(b.dob).getFullYear() - new Date(a.dob).getFullYear();
    });

    let output = students.map((student) => {
        return {
            ...student,
            age: 2019 - new Date(student.dob).getFullYear(),
        };
    });
    console.log(output)

    let groups = [];
    let currentGroup = [];

    output.forEach((student) => {
        if (currentGroup.length < 3 && !currentGroup.some((member) => Math.abs(member.age - student.age) > 5)) {
            currentGroup.push(student);
        } else {
            groups.push(currentGroup);
            currentGroup = [student];
        }
    });
    console.log(currentGroup)

    groups.push(currentGroup);

    let results = {
        noOfGroups: groups.length,
    };

    groups.forEach((group, i) => {
        let oldest = 0;
        let sum = 0;
        let regNos = [];
        let members = [];

        group.forEach((student) => {
            if (student.age > oldest) {
                oldest = student.age;
            }
            sum += student.age;
            regNos.push(parseInt(student.regNo));
            members.push({
                name: student.name,
                dob: student.dob,
                regNo: student.regNo,
                age: student.age,
            });
        });

        regNos.sort((a, b) => a - b);

        results[`group${i + 1}`] = {
            members,
            oldest,
            sum,
            regNos,
        };
    });

    console.log(results)
    return results;
};

export default classifier;
